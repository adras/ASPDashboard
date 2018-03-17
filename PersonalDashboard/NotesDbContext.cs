using Microsoft.EntityFrameworkCore;

namespace PersonalDashboard
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Note> Notes { get; set; }
    }
}