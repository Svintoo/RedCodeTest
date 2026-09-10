using BookApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Backend.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;


        public AuthService(
            AppDbContext context,
            IPasswordHasher<User> passwordHasher,
            IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        public async Task<bool> RegisterUser(RegisterRequest req)
        {
            var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == req.Email);

            if (existingUser != null)
            {
                return false;
            }
            var user = new User
            {
                Email = req.Email,
                Role = req.Role,
            };

            user.PasswordHash = _passwordHasher.HashPassword(
                user,
                req.Password
            );

            _context.Users.Add(user);

            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<User?> LoginUser(LoginRequest req)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == req.Email);

            if (existingUser == null) return null;

            var result = _passwordHasher.VerifyHashedPassword(
             existingUser,
             existingUser.PasswordHash,
             req.Password
         );
            if (result == PasswordVerificationResult.Failed) return null;

            return existingUser;
        }

        public string CreateToken(User user)
        {

            var claims = new List<Claim>
{
    new Claim("sub", user.Id.ToString()),
    new Claim("email", user.Email),
    new Claim("role", user.Role.ToString())
};

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!
                )
            );

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

