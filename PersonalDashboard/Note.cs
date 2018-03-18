using System.ComponentModel.DataAnnotations;

namespace PersonalDashboard
{
    /// <summary>
    /// Class to represent a note in the notes database
    /// </summary>
    public class Note
    {
        /// <summary>
        /// Gets or sets the id of the note
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the content of the note
        /// </summary>
        [Required, StringLength(100000, MinimumLength = 2)]
        public string Content { get; set; }

    }
}