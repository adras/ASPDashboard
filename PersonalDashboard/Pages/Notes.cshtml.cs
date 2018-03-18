using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace PersonalDashboard.Pages
{
    public class NotesModel : PageModel
    {
        private readonly NotesDbContext dbContext;


        [BindProperty]
        public IList<Note> Notes { get; set; }

        [BindProperty]
        public Note Note { get; set; }


        public NotesModel(NotesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task OnGetAsync()
        {
            Notes = await dbContext.Notes.AsNoTracking().ToListAsync();
        }

        /// <summary>
        /// Implementation of CreateNote handler to create a new note
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> OnPostCreateNoteAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            dbContext.Add(Note);

            await dbContext.SaveChangesAsync();

            return RedirectToPage("/Notes");
        }

        /// <summary>
        /// Implementation of DeleteNote handler to delete a given note
        /// </summary>
        /// <param name="id">Id of note to delete</param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostDeleteNoteAsync(int id)
        {
            Note note = await dbContext.Notes.FindAsync(id);
            if (note != null)
            {
                dbContext.Notes.Remove(note);
                await dbContext.SaveChangesAsync();
            }
            return RedirectToPage("./Notes");
        }

    }
}