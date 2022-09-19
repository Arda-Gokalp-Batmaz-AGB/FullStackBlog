using DotnetAssignment.Repositories;
using DotnetAssignment3;
using Microsoft.AspNetCore.Mvc;

namespace DotnetAssignment.Services
{
    public class EntryService : IEntryService
    {
        private IEntryRepository _repository;

        public EntryService(IEntryRepository repository)
        {
            _repository = repository;
        }
        public IEnumerable<Entry> ListEntries()
        {
           return _repository.GetAllEntries();
        }
        public Entry GetEntry(int id)
        {
            return _repository.GetEntryById(id);
        }
        public bool CreateEntry(Entry entry)
        {
            if(GetEntry(entry.Id) == null)
            {
                _repository.InsertEntry(entry);
                return true;
            }
            
            return false;
        }
        public bool RemoveEntry(int id)
        {
            if (GetEntry(id) != null)
            {
                _repository.DeleteEntry(id);
                return true;
            }
            return false;
        }
        public bool UpdateEntry(Entry updateEntry)
        {
            if (GetEntry(updateEntry.Id) != null)
            {
                _repository.UpdateEntry(updateEntry);
                return true;
            }
            return false;
        }
    }
}
