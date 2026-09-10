namespace BookApi.Models;

public class Quote
{
    public long Id { get; set; }
    public int UserId { get; set; }
    public string BookTitle { get; set; }
    public string Text { get; set; }
    public int Page { get; set; }

}