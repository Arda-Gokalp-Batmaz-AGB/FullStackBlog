using DotnetAssignment3;
using Microsoft.AspNetCore.Mvc;

namespace DotnetAssignment.Services
{
    public interface IEntryService
    {
        public IEnumerable<Entry> ListEntries();
        public Entry GetEntry(int id);
        public bool CreateEntry(Entry entry);
        public bool RemoveEntry(int id);
        public bool UpdateEntry(Entry updateEntry);
    }
}
