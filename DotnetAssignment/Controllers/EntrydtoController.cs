using DotnetAssignment3;
using DotnetAssignment3.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;

namespace DotnetAssignment.Controllers
{
    [ApiExplorerSettings(IgnoreApi =false)]
    //[ApiController]
    [Route("odata/[controller]")]
    public class EntrydtoController : ControllerBase
    {
        private readonly EntryDbContext _dbContext;

        private readonly ILogger<EntryController> _logger;

        public EntrydtoController(ILogger<EntryController> logger,EntryDbContext dbContext)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, type: typeof(IEnumerable<Entrydto>))]
        [EnableQuery(AllowedQueryOptions = AllowedQueryOptions.All)]
        public async Task<IQueryable<Entrydto>> GetEntries()
        {
            await Task.Yield();
            return _dbContext.Entries.Select(s => new Entrydto
            {
                Id = s.Id,
                title = s.title,
                author = s.author,
                body = s.body,
                favoriete = s.favoriete,
                createDate = s.createDate
            });;
        }
    }
}