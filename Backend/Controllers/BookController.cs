using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookApi.Models;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly BookContext _context;

    public BookController(BookContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookItem>>> GetBook()
    {
        return await _context.BookItems.ToListAsync();
    }

    [HttpGet("{id}")]
public async Task<ActionResult<BookItem>> GetBookItem(long id)
{
    var bookItem = await _context.BookItems.FindAsync(id);

    if (bookItem == null)
    {
        return NotFound();
    }

    return bookItem;
}

    [HttpPost]
public async Task<ActionResult<BookItem>> PostBookItem(BookItem bookItem)
{
    _context.BookItems.Add(bookItem);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetBook), new { id = bookItem.Id }, bookItem);
}
}