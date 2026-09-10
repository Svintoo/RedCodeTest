namespace BookApi.Models;

public class RegisterRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public Roles Role { get; set; }
}