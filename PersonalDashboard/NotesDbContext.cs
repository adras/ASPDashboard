using Microsoft.EntityFrameworkCore;

namespace PersonalDashboard
{
    /// <summary>
    /// Database context of notes in database
    /// </summary>
    public class NotesDbContext : DbContext
    {
        /// <summary>
        /// Creates a new instance of <see cref="NotesDbContext"/> with the given options
        /// </summary>
        /// <param name="options">Options to use</param>
        public NotesDbContext(DbContextOptions options) : base(options)
        {
        }

        /// <summary>
        /// Gets or sets the notes
        /// </summary>
        public DbSet<Note> Notes { get; set; }
    }
}