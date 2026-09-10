using Microsoft.EntityFrameworkCore;
using BookApi.Models;


namespace Backend.Services
{
    public class QuoteService
    {
        private readonly AppDbContext _context;

        public QuoteService(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Quote>> GetQuote()
        {
            return await _context.Quotes.ToListAsync();
        }

        public async Task<IEnumerable<Quote?>> GetQuotes(long id)
        {
            var quotes = await _context.Quotes
               .Where(q => q.UserId == id)
               .ToListAsync();

            return quotes;
        }

        public async Task<Quote> PostQuote(int id, Quote quote)
        {
            quote.UserId = id;
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return quote;
        }
        public async Task<Quote?> PatchQuote(long id, Quote quote)
        {
            var existingQuote = await _context.Quotes.FindAsync(quote.Id);

            if (existingQuote == null || id != existingQuote.UserId) return null;

            existingQuote.BookTitle = quote.BookTitle;
            existingQuote.Text = quote.Text;
            existingQuote.Page = quote.Page;

            await _context.SaveChangesAsync();

            return existingQuote;
        }
        public async Task<bool> DeleteQuote(long id)
        {
            var quote = await _context.Quotes.FindAsync(id);

            if (quote == null) return false;

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}