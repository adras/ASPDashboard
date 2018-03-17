using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace PersonalDashboard.Pages
{
    public class IndexNotesModel : PageModel
    {
        private readonly NotesDbContext dbContext;


        [BindProperty]
        public IList<Note> Notes { get; set; }

        public IndexNotesModel(NotesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task OnGet()
        {
            Notes = await dbContext.Notes.AsNoTracking().ToListAsync();
        }
    }
}