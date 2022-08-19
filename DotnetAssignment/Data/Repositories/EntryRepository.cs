using DotnetAssignment.Repositories;
using DotnetAssignment3;
using DotnetAssignment3.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data.SQLite;
namespace DotnetAssignment.Data.Repositories
{
    public class EntryRepository : IEntryRepository
    {
        private static string connectionString = "Data Source= EntryDatabase.db;Version=3;";
        private readonly EntryDbContext _dbContext;

        public EntryRepository(EntryDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void DeleteEntry(int id)
        {
            string query = "DELETE FROM Entries WHERE Id=" + id;
            SQLiteConnection connection = new SQLiteConnection(connectionString);
            connection.Open();
            SQLiteCommand command = new SQLiteCommand(query, connection);
            var sucess = command.ExecuteNonQuery();
            connection.Close();
        }

        public IEnumerable<Entry> GetAllEntries()
        {
            List<Entry> entries = new List<Entry>();
            SQLiteConnection connection = new SQLiteConnection(connectionString);
            connection.Open();
            String query = "SELECT * FROM Entries";
            SQLiteCommand command = new SQLiteCommand(query, connection);
            SQLiteDataReader dataReader = command.ExecuteReader();

            Entry tempEntry = null;
            while (dataReader.Read())
            {
                tempEntry = new Entry();
                tempEntry.Id = Convert.ToInt32(dataReader["Id"]);
                tempEntry.title = (string)dataReader["title"];
                tempEntry.author = (string)dataReader["Author"];
                tempEntry.body = (string)dataReader["body"];
                tempEntry.favoriete = (string)dataReader["favoriete"];
                tempEntry.createDate = DateTime.Parse((string)dataReader["createDate"]);
                tempEntry.updateDate = DateTime.Parse((string)dataReader["updateDate"]);

                entries.Add(tempEntry);
            }
            connection.Close();
            return entries;
        }

        public Entry GetEntryById(int id)
        {
            string query = "SELECT * FROM Entries WHERE Id=" + id;
            SQLiteConnection connection = new SQLiteConnection(connectionString);
            connection.Open();
            SQLiteCommand command = new SQLiteCommand(query, connection);
            SQLiteDataReader dataReader = command.ExecuteReader();
            Entry tempEntry = null;
            while (dataReader.Read())
            {
                tempEntry = new Entry();
                tempEntry.Id = Convert.ToInt32(dataReader["Id"]);
                tempEntry.title = (string)dataReader["title"];
                tempEntry.author = (string)dataReader["Author"];
                tempEntry.body = (string)dataReader["body"];
                tempEntry.favoriete = (string)dataReader["favoriete"];
                tempEntry.createDate = DateTime.Parse((string)dataReader["createDate"]);
                tempEntry.updateDate = DateTime.Parse((string)dataReader["updateDate"]);
            }
            connection.Close();
            return tempEntry;
        }

        public void InsertEntry(Entry entry)
        {
            string query = String.Format("Insert INTO Entries(Id, title, author, body, favoriete,createDate,updateDate) VALUES(@Id, @title, @author, @body, @favoriete, @createDate, @updateDate)");
            SQLiteConnection connection = new SQLiteConnection(connectionString);
            connection.Open();
            SQLiteCommand command = new SQLiteCommand(query, connection);
            command.Parameters.Add("@Id", System.Data.DbType.VarNumeric).Value = entry.Id;
            command.Parameters.Add("@title", System.Data.DbType.String).Value = entry.title;
            command.Parameters.Add("@author", System.Data.DbType.String).Value = entry.author;
            command.Parameters.Add("@body", System.Data.DbType.String).Value = entry.body;
            command.Parameters.Add("@favoriete", System.Data.DbType.String).Value = entry.favoriete;
            command.Parameters.Add("@createDate", System.Data.DbType.String).Value = entry.createDate;
            command.Parameters.Add("@updateDate", System.Data.DbType.String).Value = entry.updateDate;
            command.ExecuteNonQuery();
            connection.Close();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public void UpdateEntry(Entry updateEntry)
        {
            string query = string.Format("UPDATE Entries SET title = @title, author = @author, " +
    "body = @body, favoriete = @favoriete, createDate = @createDate," +
    " updateDate = @updateDate WHERE Id =" + updateEntry.Id);
            SQLiteConnection connection = new SQLiteConnection(connectionString);
            connection.Open();
            SQLiteCommand command = new SQLiteCommand(query, connection);
            command.Parameters.Add("@title", System.Data.DbType.String).Value = updateEntry.title;
            command.Parameters.Add("@author", System.Data.DbType.String).Value = updateEntry.author;
            command.Parameters.Add("@body", System.Data.DbType.String).Value = updateEntry.body;
            command.Parameters.Add("@favoriete", System.Data.DbType.String).Value = updateEntry.favoriete;
            command.Parameters.Add("@createDate", System.Data.DbType.String).Value = updateEntry.createDate;
            command.Parameters.Add("@updateDate", System.Data.DbType.String).Value = updateEntry.updateDate;
            command.ExecuteNonQuery();
            connection.Close();
        }
    }
}
