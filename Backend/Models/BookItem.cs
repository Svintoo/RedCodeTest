namespace BookApi.Models;

public class BookItem
{
    public long Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public DateTime Date { get; set; }
}