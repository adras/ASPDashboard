using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace PersonalDashboard.Pages
{
    public class EditNoteModel : PageModel
    {
        private readonly NotesDbContext dbContext;

        public EditNoteModel(NotesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [BindProperty]
        public Note Note { get; set; }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            Note = await dbContext.Notes.FindAsync(id);
            if (Note == null)
            {
                return RedirectToPage("./Error");
            }

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            dbContext.Attach(Note).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException ex)
            {
                throw new Exception($"Note: '{Note.Id}' could not be edited", ex);
            }

            return RedirectToPage("/IndexNotes");
        }
    }
}