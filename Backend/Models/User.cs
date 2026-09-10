namespace BookApi.Models;

public enum Roles { User, Admin }

public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public Roles Role { get; set; }
    public ICollection<Quote> Quotes { get; set; }

}