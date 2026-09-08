using Microsoft.EntityFrameworkCore;

namespace BookApi.Models;

public class QuoteContext : DbContext
{
    public QuoteContext(DbContextOptions<QuoteContext> options)
        : base(options)
    {
    }

    public DbSet<Quote> Quotes { get; set; } = null!;
}