using Microsoft.AspNetCore.Mvc;
using BookApi.Models;
using Backend.Constants;
using Backend.Services;
using System.ComponentModel.DataAnnotations;
using Microsoft.Build.Tasks;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost(Routes.RouteRegister)]
    public async Task<IActionResult> RegisterUser(RegisterRequest req)
    {
        RegisterValidator validator = new RegisterValidator();
        var validationResult = validator.Validate(req);
        if (!validationResult.IsValid)
        {
            foreach (var failure in validationResult.Errors)
            {
                Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
            }
            return BadRequest();
        }
        var result = await _authService.RegisterUser(req);
        if (result)
        {
            return Ok();
        }
        else
        {
            return NoContent();
        }
    }

    [HttpPost(Routes.RouteLogin)]
    public async Task<IActionResult> LoginUser(LoginRequest req)
    {
        LoginValidator validator = new LoginValidator();
        var validationResult = validator.Validate(req);
        if (!validationResult.IsValid)
        {
            foreach (var failure in validationResult.Errors)
            {
                Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
            }
            return BadRequest();
        }

        var user = await _authService.LoginUser(req);
        if (user == null)
        {
            return Unauthorized("Invalid credentials");
        }
        var token = _authService.CreateToken(user);
        return Ok(new { token });
    }
}