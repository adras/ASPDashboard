using System.ComponentModel.DataAnnotations;

namespace PersonalDashboard
{
    public class Note
    {
        public int Id { get; set; }

        [Required, StringLength(10000000)]
        public int Content { get; set; }

    }
}