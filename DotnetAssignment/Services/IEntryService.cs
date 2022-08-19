using DotnetAssignment3;
using Microsoft.AspNetCore.Mvc;

namespace DotnetAssignment.Services
{
    public interface IEntryService
    {
        public IEnumerable<Entry> ListEntries();
        public Entry GetEntry(int id);
        public void CreateEntry(Entry entry);
        public void RemoveEntry(int id);
        public void UpdateEntry(Entry updateEntry);
    }
}
