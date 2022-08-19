using DotnetAssignment3;
using Microsoft.AspNetCore.Mvc;

namespace DotnetAssignment.Repositories
{
    public interface IEntryRepository
    {
        public IEnumerable<Entry> GetAllEntries();
        public Entry GetEntryById(int id);
        public void InsertEntry(Entry entry);
        public void DeleteEntry(int id);
        public void UpdateEntry(Entry updateEntry);
        public void Save();

    }
}
