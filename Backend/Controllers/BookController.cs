using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BookApi.Models;
using Backend.Services;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly BookService _bookService;

    public BookController(BookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookItem>>> GetBooks()
    {
        var books = await _bookService.GetBooks();
        return Ok(books);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<BookItem?>> GetBookItem(long id)
    {
        var result = await _bookService.GetBookItem(id);
        if (result == null) return NotFound();

        return Ok(result);
    }
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<BookItem>> PostBookItem(BookItem bookItem)
    {
        var result = await _bookService.PostBookItem(bookItem);
        if (result == null) return NotFound();

        return CreatedAtAction(nameof(GetBooks), new { id = result.Id }, result);
    }
    [Authorize(Roles = "Admin")]
    [HttpPatch("{id}")]
    public async Task<ActionResult<BookItem>> PatchBookItem(long id, BookItem bookItem)
    {
        var book = await _bookService.PatchBookItem(id, bookItem);
        if (book == null) return NotFound();

        return Ok(book);
    }
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(long id)
    {
        var book = await _bookService.DeleteBook(id);

        if (!book) return NotFound();

        return Ok();
    }

}