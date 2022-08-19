using System;
using ClientApi.Services;
namespace ClientApi // Note: actual namespace depends on the project name.
{
    internal class Program
    {

		static async Task Main(string[] args)
        {
            var httpClient = new HttpClient();
			EntryServiceClient client = new EntryServiceClient(
                 "https://localhost:7055/",
                 httpClient);
			await GetAllPosts(client);
			//await DeletePost(client);
			//await GetAllPosts(client);
			//await UpdatePost(client);
			//await AddNewPost(client);
		}

		private static async Task DeletePost(EntryServiceClient client)
		{
			var m = (await client.EntryAllAsync()).Last();

			await client.EntryDELETEAsync(m.Id);

			Console.WriteLine("**** Deleted Post ****");
			Console.WriteLine($"Id:{m.Id}	Title:{m.Title}	Author:{m.Author}	 Body:{m.Body}	 Favoriete:{m.Favoriete}");

			await GetAllPosts(client);
		}

		private static async Task GetAllPosts(EntryServiceClient client)
		{
			var posts = await client.EntryAllAsync();
			Console.WriteLine("**** All Posts ****");
			foreach (var m in posts)
			{
				Console.WriteLine($"Id:{m.Id}	Title:{m.Title}	Author:{m.Author}	 Body:{m.Body}	 Favoriete:{m.Favoriete}");
			}
		}

		private static async Task UpdatePost(EntryServiceClient client)
		{
			var m = (await client.EntryAllAsync()).First();
			m.Favoriete = "like";
			await client.EntryPUTAsync(m.Id.ToString(), m);

			Console.WriteLine("**** Updated Post ****");
			Console.WriteLine($"Id:{m.Id}	Title:{m.Title}	Author:{m.Author}	 Body:{m.Body}	 Favoriete:{m.Favoriete}");

			await GetAllPosts(client);
		}

		private static async Task AddNewPost(EntryServiceClient client)
		{
			var now = DateTime.Now;
				var m = await client.EntryPOSTAsync(new Entry()
				{
					Id = HashCode.Combine("new item", "arda", "deneme yazisi"),
					Title = "new item",
					Author = "arda",
					Body = "deneme yazisi",
					Favoriete = "like",
					CreateDate = DateTime.Now,
					UpdateDate = DateTime.Now,
				});;
				Console.WriteLine("**** Added Post ****");
				Console.WriteLine($"Id:{m.Id}	Title:{m.Title}	Author:{m.Author}	 Body:{m.Body}	 Favoriete:{m.Favoriete}");
			await GetAllPosts(client);
		}


	}
}