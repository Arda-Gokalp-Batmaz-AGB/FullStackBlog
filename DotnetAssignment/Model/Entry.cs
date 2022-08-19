using System;
using System.ComponentModel.DataAnnotations;

namespace DotnetAssignment3
{
    public class Entry
    {
        [Key]
        public int Id { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string body { get; set; }
        public string favoriete { get; set; } = "NaN";
        public DateTime createDate { get; set; }
        public DateTime updateDate { get; set; }

        public Entry(string title, string author,string body)
        {
            this.title = title;
            this.author = author;
            this.body = body;
            this.createDate=DateTime.Now;
            this.updateDate=DateTime.Now;
        }
        public Entry()
        {

        }
        public bool Equals(Entry other)
        {
            return other != null &&
                   this.Id == other.Id &&
                   this.title == other.title &&
                   this.author == other.author &&
                   this.body == other.body;
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(title, author, body);
        }
    }
}
