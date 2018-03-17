using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace PersonalDashboard.Pages
{
    public class CreateNotesModel : PageModel
    {
        private readonly NotesDbContext dbContext;


        [BindProperty]
        public Note Note { get; set; }

        public CreateNotesModel(NotesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            dbContext.Add(Note);

            await dbContext.SaveChangesAsync();

            return RedirectToPage("/CreateNotes");
        }
    }
}