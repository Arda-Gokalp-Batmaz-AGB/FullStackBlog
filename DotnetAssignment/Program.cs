using DotnetAssignment3;
using DotnetAssignment3.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;
using Microsoft.OData;
using Microsoft.AspNetCore.OData;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Microsoft.OpenApi.Models;
using DotnetAssignment.Repositories;
using DotnetAssignment.Data.Repositories;
using DotnetAssignment.Services;

IEdmModel GetEdmModel()
{
    var builder = new ODataConventionModelBuilder();
    builder.EntitySet<Entrydto>("Entrydto").EntityType
                .HasKey(s => s.Id); ;
    return builder.GetEdmModel();
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRouting();
//builder.Services.AddTransient(serviceProvider => new MovieDbContext()) ();
// Add services to the container.
//builder.Services.AddControllers().AddOData(opt => opt.AddRouteComponents("v1", GetEdmModel()).Filter().Select().Expand());
builder.Services.AddControllers();
//builder.Services.AddControllers().AddOData(options => options.Select().Filter().OrderBy().Count().Expand().SetMaxTop(50));
builder.Services.AddControllers().AddOData(opt => opt.AddRouteComponents("odata", GetEdmModel()).Select().Filter().Expand().OrderBy().Count().SetMaxTop(50));
builder.Services.AddScoped<IEntryRepository, EntryRepository>();
builder.Services.AddScoped<IEntryService, EntryService>();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DotnetAssignment.Api", Version = "v1" });
}); ;
builder.Services.AddHttpContextAccessor();

//var entryDb = new EntryDbContext();
//entryDb.Database.EnsureCreated();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<EntryDbContext>(options =>
    options.UseSqlite(connectionString), Microsoft.Extensions.DependencyInjection.ServiceLifetime.Transient);

//var connectionString = builder.Configuration.GetConnectionString("Entries");
//builder.Services.AddDbContext<EntryDbContext>(x => x.UseSqlServer(connectionString));

var app = builder.Build();


//app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DotnetAssignment.Api v1"));
}

app.UseCors(x => x
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();



app.MapControllers();


app.Run();
