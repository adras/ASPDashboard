using System.ComponentModel.DataAnnotations;

namespace PersonalDashboard
{
    public class Note
    {
        public int Id { get; set; }

        [Required, StringLength(100000, MinimumLength = 2)]
        public string Content { get; set; }

    }
}