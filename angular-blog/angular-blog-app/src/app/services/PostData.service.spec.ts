import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { PostDataService,Post } from '../services/PostData.service';
import { HttpClient,HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of ,throwError} from 'rxjs';
describe('PostDataService', () => {
    let postService : PostDataService;
    let httpController: HttpTestingController;
    //let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let url = "https://localhost:7055/api/";
    //const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    let mockData = [
      {
        "id": -1865174072,
        "title": "asdsadsadsadasdsad",
        "author": "sadsadsadsa",
        "body": "dsadsadsadsadsadsadsadsa",
        "favoriete": "like",
        "createDate": "2022-08-09T20:40:20",
        "updateDate": "2022-08-09T20:40:20",
      },
      {
        "id": -1007848049,
        "title": "denemeler",
        "author": "asdsadsadsa",
        "body": "sadsadsadsadsadsadsadsa",
        "favoriete": "dislike",
        "createDate": "2022-08-10T15:57:38",
        "updateDate": "2022-08-10T15:57:38"
      },
      {
        "id": -1017848049,
        "title": "denemeler3",
        "author": "asdsadsadsa",
        "body": "sadsadsadsadsadsadsadsa",
        "favoriete": "dislike",
        "createDate": "2022-08-10T15:57:38",
        "updateDate": "2022-08-10T15:57:38"
      },
    ]
    function setup() {
    
      const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const secondaryPostService = new PostDataService(httpClientSpy);
      return { secondaryPostService, httpClientSpy };
    }
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [],
        imports : [HttpClientTestingModule],
        providers : [HttpClient,PostDataService,]
      })
      .compileComponents();
      postService = TestBed.inject(PostDataService);
	    httpController = TestBed.inject(HttpTestingController);

    });

    it('can test an error with spy object', (done: DoneFn) => {
      const { secondaryPostService, httpClientSpy } = setup();
    
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found',
      });
    
      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    
      secondaryPostService.getPosts().subscribe({
        next: posts => done.fail('expected an error, not posts'),
        error: (errorresp: { error: any; status: any; })  => {
          expect(errorresp.error).toContain('test 404 error');
          expect(errorresp.status).toEqual(404);
          done();
        }
      });
    });
    it('should return posts with spy object', (done: DoneFn) => {
      const { secondaryPostService, httpClientSpy } = setup();

      httpClientSpy.get.and.returnValue(of(mockData));
      secondaryPostService.getPosts().subscribe({
        next: (posts : Post[]) => {
          expect(secondaryPostService.ConvertPosts(posts))
            .withContext('expected posts')
            .toEqual(secondaryPostService.ConvertPosts(mockData) );
          done();
        },
        error: done.fail
      });
      expect(httpClientSpy.get.calls.count())
        .withContext('one call')
        .toBe(1);
    });

  	it('should call getPosts and return an array of Post items', (() => {
			
		  postService.getPosts().subscribe((res: Post[]) => {
	      expect(res.length).toEqual(mockData.length);
	    });
	    const req = httpController.expectOne({
	      method: 'GET',
	      url: `${url}Entry`,
	    });
	    req.flush(mockData);
      httpController.verify();
	  }));
    it('should add an item to the mock backend', (() => {
			let post = new Post("deneme","test","deneme");
		  postService.addPost(post).subscribe((res: Post) => {
	      expect(res).toEqual(post);
	    });
	    const req = httpController.expectOne({
	      method: 'Post',
	      url: `${url}Entry`,
	    });
      mockData.push(JSON.parse(JSON.stringify(post)));
	    req.flush(post);
      httpController.verify();
	  }));
    
    it('should remove an item to the mock backend', (() => {
      let post : Post = postService.ConvertPosts(mockData)[0];
		  postService.deletePost(post.ID).subscribe((res) => {
	      expect((res as unknown as Post).ID).toEqual(post.ID);
        expect(mockData.length).toBeGreaterThanOrEqual(2);
	    });
	    const req = httpController.expectOne({
	      method: 'DELETE',
	      url: `${url}Entry?id=`+post.ID,
	    });
      mockData.shift();
	    req.flush(post);
      console.log(mockData);
      httpController.verify();
	  }));
    it('should convert json array to post array ', (() => {
      let postList : Post[]= postService.ConvertPosts(mockData.concat([]));
     // console.log(postList);
      let allElementsConvertedSucessfully = true;
      for (let i = 0; i < postList.length; i++) {
        const element = postList[i];
        if(!(element instanceof Post))
        {
          allElementsConvertedSucessfully=false;
        }
      }
      expect(allElementsConvertedSucessfully).toBeTrue();
	  }));

    it('can test for network error', done => {
      const mockError = new ProgressEvent('error');
    
      postService.getPosts().subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: HttpErrorResponse) => {
          expect(error.error).toEqual(mockError);
          done();
        },
      });
    
      const req = httpController.expectOne(url+"Entry");
    
      req.error(mockError);
    });
    it('two objects are equal', () => {
      const post1 = new Post("arda","batmaz","gokalp");
      const post2 = new Post("arda","batmaz","gokalp");
      expect(post1.equals(post2)).toBeTrue();
    });
    it('two objects are NOT equal', () => {
      const post1 = new Post("arda","batmaz","gokalp");
      const post2 = new Post("ardas","batmaz","gokalp");
      post1.ID = post2.ID;
      expect(post1.equals(post2)).toBeFalse();
    });
    it('two objects are NOT equal titles are different', () => {
      const post1 = new Post("arda","batmaz","gokalp");
      const post2 = new Post("ardaS","batmazA","gokalpP");
      post1.ID = post2.ID;
      post1.title = post2.title;
      expect(post1.equals(post2)).toBeFalse();
    });
    it('two objects are NOT equal authors are different', () => {
      const post1 = new Post("arda","batmaz","gokalp");
      const post2 = new Post("arda","batmazA","gokalp");
      post1.ID = post2.ID;
      expect(post1.equals(post2)).toBeFalse();
    });
    it('two objects are NOT equal body values are different', () => {
      const post1 = new Post("arda","batmaz","gokalp");
      const post2 = new Post("arda","batmaz","gokalpP");
      post1.ID = post2.ID;
      expect(post1.equals(post2)).toBeFalse();
    });

  });
  


