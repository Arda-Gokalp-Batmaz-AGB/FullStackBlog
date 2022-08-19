using System;
using System.ComponentModel.DataAnnotations;

namespace DotnetAssignment3
{
    public class Entrydto
    {
        [Key]
        public int Id { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string body { get; set; }
        public string favoriete { get; set; } = "NaN";
        public DateTime createDate { get; set; }
    }
}
