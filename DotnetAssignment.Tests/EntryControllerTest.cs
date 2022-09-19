using DotnetAssignment.Controllers;
using DotnetAssignment.Services;
using DotnetAssignment.Tests;
using DotnetAssignment3;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
namespace DotnetAssignment.Tests
{
    public class MockData
    {
        public List<Entry> entries;
        public MockData()
        {
            entries = _getMockData();
        }
        private List<Entry> _getMockData()
        {
            return new List<Entry>()
            {
                new Entry
                {
                    Id = 1,
                    title = "title_1",
                    author = "arda",
                    body = "testing body paragraphh_1",
                    createDate = DateTime.Now,
                    updateDate = DateTime.Now,
                },
                new Entry
                {
                    Id = 2,
                    title = "title_2",
                    author = "gokalp",
                    body = "testing body paragraphh_2",
                    createDate = DateTime.Now,
                    updateDate = DateTime.Now,
                },
                new Entry
                {
                    Id = 3,
                    title = "title_3",
                    author = "gokalp",
                    body = "testing body paragraphh_3",
                    createDate = DateTime.Now,
                    updateDate = DateTime.Now,
                }
            };
        }
    }

    public class EntryControllerTest : IDisposable
    {
        Mock<IEntryService> mockService;
        List<Entry> entryList;
        public EntryControllerTest()
        {
            mockService = new Mock<IEntryService>();
            entryList = new MockData().entries;
        }
        public void Dispose()
        {
            mockService = null;
            entryList = null;
        }
        [Fact]
        public async Task GetEntries_ShouldReturnStatusCode200WithOkObjectResultType()
        {
            mockService.Setup(service => service.ListEntries()).Returns(new List<Entry>() { new Entry("a", "b", "c"),
        new Entry("d", "g", "f") });
            var controller = new EntryController(mockService.Object);
            var response = controller.GetEntries();
            var result = Assert.IsType<OkObjectResult>(response.Result);
            Assert.Equal(200, result.StatusCode);
        }

        [Fact]
        public async Task GetEntries_ShouldReturnTheProvidedEntryList()
        {
            mockService.Setup(service => service.ListEntries()).Returns(entryList);
            var controller = new EntryController(mockService.Object);
            var response = controller.GetEntries();
            var result = Assert.IsType<OkObjectResult>(response.Result).Value as List<Entry>;
            Assert.Equal(entryList.Count(), result?.Count());
            Assert.Equal(entryList, result);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetEntry_ShouldReturnTheElement_WhenItsIDProvided(int ID)
        {
            var expectedValue = entryList.Where(x => x.Id == ID).Single();
            mockService.Setup(service => service.GetEntry(ID)).Returns(expectedValue);
            var controller = new EntryController(mockService.Object);

            var response = controller.GetEntry(ID);
            var result = Assert.IsType<OkObjectResult>(response.Result).Value as Entry;
            Assert.Equal(expectedValue, result);
        }

        [Theory]
        [InlineData(5)]
        [InlineData(15)]
        [InlineData(99)]
        public async Task GetEntry_ShouldReturn404NotFound_WhenTheProvidedIDDoesntExists(int ID)
        {
            mockService.Setup(service => service.GetEntry(ID)).Returns(null as Entry);
            var controller = new EntryController(mockService.Object);

            var response = controller.GetEntry(ID);
            var result = response.Result as NotFoundResult;
            Assert.Equal(404, result.StatusCode);
        }

        [Fact]
        public async Task PostEntry_ShouldAddEntryToList_WhenValidEntryProvided()
        {
            Entry newEntry = new Entry("title_10", "ardda", "testbody");
            mockService.Setup(service => service.CreateEntry(newEntry)).Returns(true).Callback(() => entryList.Add(newEntry));
            var controller = new EntryController(mockService.Object);

            var response = controller.PostEntry(newEntry);
            var addedEntry = (response.Result as OkObjectResult).Value as Entry;
            var result = entryList.Contains(addedEntry);
            //Assert.IsType<Entry>(result) ;
            Assert.True(result);
        }
        [Fact]
        public async Task PostEntry_ShouldReturnBadRequestWith400StatusCode_WhenDuplicatedValueProvided()
        {
            Entry newEntry = new Entry("title_10", "ardda", "testbody");
            mockService.Setup(service => service.CreateEntry(newEntry)).Returns(false);
            var controller = new EntryController(mockService.Object);

            var response = controller.PostEntry(newEntry);
            var requestCode = (response.Result as BadRequestObjectResult).StatusCode;
            //Assert.IsType<Entry>(result) ;
            Assert.Equal(400, requestCode);
        }

        [Fact]
        public async Task DeleteEntry_ShouldDeleteEntryFromListWithStatusCode200_WhenValidIdProvided()
        {
            int oldlength = entryList.Count;
            int ID = 1;
            mockService.Setup(service => service.RemoveEntry(ID)).Returns(true).Callback(() => entryList = entryList.Where(x => x.Id != ID).ToList());
            var controller = new EntryController(mockService.Object);

            var response = controller.DeleteEntry(ID);
            var requestCode = (response as OkObjectResult).StatusCode;
            //var result = entryList.Contains(addedEntry);
            //Assert.IsType<Entry>(result) ;
            Assert.Equal(200, requestCode);
            Assert.Equal(entryList.Count, oldlength - 1);
        }
        [Fact]
        public async Task DeleteEntry_ShouldReturn404NotFoundRequest_WhenNonExistedIdProvided()
        {
            int ID = 11;
            mockService.Setup(service => service.RemoveEntry(ID)).Returns(false);
            var controller = new EntryController(mockService.Object);
            var response = controller.DeleteEntry(ID);
            var requestCode = (response as NotFoundResult).StatusCode;
            Assert.Equal(404, requestCode);
        }
        [Fact]
        public async Task UpdateEntry_ShouldUpdateEntryFromList_WhenaValidEntryProvided()
        {
            Entry newEntry = new Entry("title_22", "gokalp", "testbody");
            Entry oldEntry = new Entry("titlesss", "gokalp", "testbody");
            oldEntry.Id = newEntry.Id;
            entryList.Add(oldEntry);
            mockService.Setup(service => service.UpdateEntry(newEntry)).Returns(true).
                Callback(() => entryList = entryList.Where(x => x.Id != newEntry.Id).Append(newEntry).ToList());
            var controller = new EntryController(mockService.Object);

            var response = controller.UpdateEntry(newEntry);
            var result = (response.Result as OkObjectResult).Value as Entry;
            Assert.True(entryList.Contains(newEntry));
            Assert.True(newEntry.Equals(result));
        }
         [Fact]
        public async Task UpdateEntry_ShouldReturn404NotFoundRequest_WhenaEntryWithNonExistedIdProvided()
        {
            Entry newEntry = new Entry("title_22", "gokalp", "testbody");
            Console.WriteLine(entryList);
            mockService.Setup(service => service.UpdateEntry(newEntry)).Returns(false);
            var controller = new EntryController(mockService.Object);
            var response = controller.UpdateEntry(newEntry);
            var requestCode = (response.Result as NotFoundObjectResult).StatusCode;
            Assert.Equal(404, requestCode);
        }
    }
}

