using Microsoft.EntityFrameworkCore;
using BookApi.Models;


namespace Backend.Services
{
    public class BookService
    {
        private readonly AppDbContext _context;


        public BookService(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookItem?>> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            return books;
        }
        public async Task<BookItem?> GetBookItem(long id)
        {
            var bookItem = await _context.Books.FindAsync(id);
            if (bookItem == null) return null;

            return bookItem;
        }
        public async Task<BookItem> PostBookItem(BookItem bookItem)
        {
            var book = new BookItem
            {
                Author = bookItem.Author,
                Title = bookItem.Title,
                Date = bookItem.Date
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return book;
        }
        public async Task<BookItem?> PatchBookItem(long id, BookItem bookItem)
        {

            var book = await _context.Books.FindAsync(id);
            if (book == null) return null;

            book.Title = bookItem.Title;
            book.Author = bookItem.Author;
            book.Date = bookItem.Date;

            await _context.SaveChangesAsync();
            return book;
        }
        public async Task<bool> DeleteBook(long id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}