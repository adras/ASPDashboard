using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PersonalDashboard.Pages
{
    public class CreateNotes : PageModel
    {
        private readonly NotesDbContext dbContext;

        Note Note { get; set; }

        public CreateNotes(NotesDbContext dbContext)
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

            return RedirectToPage("/");
        }
    }
}