using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookApi.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuoteController : ControllerBase
{
    private readonly QuoteService _quoteService;

    public QuoteController(QuoteService quoteService)
    {
        _quoteService = quoteService;
    }
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quote>>> GetQuote()
    {
        var result = await _quoteService.GetQuote();
        return Ok(result);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes(long id)
    {
        var result = await _quoteService.GetQuotes(id);
        if (result == null) return NoContent();

        return Ok(result);
    }
    [Authorize]
    [HttpPost("{id}")]
    public async Task<ActionResult<Quote>> PostQuote(int id, Quote quote)
    {
        var result = await _quoteService.PostQuote(id, quote);
        if (result == null) return NoContent();

        return CreatedAtAction(nameof(GetQuote), new { id = result.Id }, result);
    }
    [Authorize]
    [HttpPatch("{id}")]
    public async Task<ActionResult<Quote>> PatchQuote(long id, Quote quote)
    {
        var result = await _quoteService.PatchQuote(id, quote);
        if (result == null) return Unauthorized();

        return Ok(result);

    }
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(long id)
    {
        var result = await _quoteService.DeleteQuote(id);
        if (!result) return NotFound();

        return Ok(result);
    }
}