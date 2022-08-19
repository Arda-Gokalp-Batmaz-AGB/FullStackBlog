using DotnetAssignment.Services;
using DotnetAssignment3;
using DotnetAssignment3.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data.SQLite;
namespace DotnetAssignment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntryController : ControllerBase
    {
        private readonly IEntryService _service;

        public EntryController(IEntryService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Entry>> GetEntries()
        {
            return Ok(_service.ListEntries());
        }
        [HttpGet("{id}")]
        public ActionResult<Entry> GetEntry(int id)
        {
            var tempEntry = _service.GetEntry(id);
            if(tempEntry == null)
            {
                return NotFound();
            }
            return Ok(tempEntry);
        }

        [HttpPost]
        public ActionResult<Entry> PostEntry(Entry entry)
        {
            _service.CreateEntry(entry);
            return Ok(entry);
        }
        [HttpDelete]
        public ActionResult DeleteEntry(int id)
        {
            _service.RemoveEntry(id);
            return Ok(id);
        }

        [HttpPut("{id}")]
        public ActionResult<Entry> UpdateEntry(Entry updateEntry)
        {
            _service.UpdateEntry(updateEntry);
            return Ok(updateEntry);
        }
    }
}