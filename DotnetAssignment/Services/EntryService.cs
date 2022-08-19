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
        public void CreateEntry(Entry entry)
        {
            _repository.InsertEntry(entry);
        }
        public void RemoveEntry(int id)
        {
            if(_repository.GetEntryById(id) != null)
            {
                _repository.DeleteEntry(id);
            }
        }
        public void UpdateEntry(Entry updateEntry)
        {
            _repository.UpdateEntry(updateEntry);
        }
    }
}
