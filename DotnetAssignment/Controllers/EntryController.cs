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
            if (tempEntry == null)
            {
                return NotFound();
            }
            return Ok(tempEntry);
        }

        [HttpPost]
        public ActionResult<Entry> PostEntry(Entry entry)
        {
            var response = _service.CreateEntry(entry);
            if (response == true)
            {
                return Ok(entry);
            }
            return BadRequest(response);
        }
        [HttpDelete]
        public ActionResult DeleteEntry(int id)
        {
            var response = _service.RemoveEntry(id);
            if (response == true)
            {
                return Ok(id);
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public ActionResult<Entry> UpdateEntry(Entry updateEntry)
        {
            var response = _service.UpdateEntry(updateEntry);
            if(response == true)
            {
                return Ok(updateEntry);
            }
            return NotFound("The Entry that wanted to be updated not found");
        }
    }
}