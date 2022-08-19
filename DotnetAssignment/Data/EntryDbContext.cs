using Microsoft.EntityFrameworkCore;
using System.Reflection;
namespace DotnetAssignment3.Model
{
    public class EntryDbContext : DbContext
    {
		public EntryDbContext(DbContextOptions<EntryDbContext> options)
	: base(options)
		{
			Database.EnsureCreated();
		}
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlite("Filename=EntryDatabase.db", options =>
			{
				options.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName);
			});
			base.OnConfiguring(optionsBuilder);
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// Map table names
			modelBuilder.Entity<Entry>().ToTable("Entries", "test");
			modelBuilder.Entity<Entry>(entity =>
			{
				entity.HasKey(e => e.Id);
				entity.Property(e => e.title);
				entity.Property(e => e.author);
				entity.Property(e => e.body);
				entity.Property(e => e.favoriete);
			});
			base.OnModelCreating(modelBuilder);
		}

		//entities
		public DbSet<Entry> Entries { get; set; }
    }
}
