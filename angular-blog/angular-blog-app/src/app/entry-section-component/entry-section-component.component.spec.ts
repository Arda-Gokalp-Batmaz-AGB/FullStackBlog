import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EntrySectionComponentComponent } from './entry-section-component.component';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import { Post, PostDataService } from '../services/PostData.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
describe('EntrySectionComponentComponent', () => {
  let component: EntrySectionComponentComponent;
  let fixture: ComponentFixture<EntrySectionComponentComponent>;
  let postService : PostDataService;
  let httpController: HttpTestingController;
  let url = "https://localhost:7055/api/";
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrySectionComponentComponent],
      imports : [  
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule, MatToolbarModule, MatIconModule, MatBadgeModule,
        MatTableModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
        MatSlideToggleModule,
        MatPaginatorModule,BrowserAnimationsModule,HttpClientTestingModule],
        providers : [HttpClient,PostDataService,MatTableDataSource]
    })
    .compileComponents();
    postService = TestBed.inject(PostDataService);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EntrySectionComponentComponent);
    component = fixture.componentInstance;
   //component.ngAfterViewInit()
    //const test = fixture.debugElement.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('create the table with exactly given posts', (() => {
   // cont count = container.querySelectorAll("button");
    component.postList=[new Post("asd","asfas","sadasd"),new Post("asd2","asfas","sadasd"),new Post("asd3","asfas","sadasd")];
    
    component.updateSource();
    fixture.detectChanges();
    const count = fixture.nativeElement.querySelectorAll('.removebutton').length;
    expect(count).toBe(component.postList.length);
  }));
  it('remove first post on the table', (()=> {
    component.postList=[new Post("asd","asfas","sadasd"),new Post("asd2","asfas","sadasd"),new Post("asd3","asfas","sadasd")];
    component.postList.shift()
    component.updateSource();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.removebutton').length).toBe(2);
  }));
  it('form invalid when title too small', () => {
    component.postForm.controls.title.setValue('asd');
    component.postForm.controls.author.setValue('ardaauthor');
    component.postForm.controls.body.setValue('testing body paragraph that can be used for test cases');
    expect(component.postForm.valid).toBeFalsy();
  });
  it('form invalid when title contains special characters', () => {
    component.postForm.controls.title.setValue('@*12sad');
    component.postForm.controls.author.setValue('ardaauthor');
    component.postForm.controls.body.setValue('testing body paragraph that can be used for test cases');
    expect(component.postForm.valid).toBeFalsy();
  });
  it('form invalid when body is too small', () => {
    component.postForm.controls.title.setValue('ardatitle');
    component.postForm.controls.author.setValue('ardaauthor');
    component.postForm.controls.body.setValue('testing ');
    expect(component.postForm.valid).toBeFalsy();
  });
  it('form invalid when author is too long', () => {
    component.postForm.controls.title.setValue('ardatitle');
    component.postForm.controls.author.setValue('ardaauthor ardaauthor ardaauthor ardaauthor ardaauthor');
    component.postForm.controls.body.setValue('testing body paragraph that can be used for test cases ');
    expect(component.postForm.valid).toBeFalsy();
  });
  it('form is valid with given parameters', () => {
    component.postForm.controls.title.setValue('ardatitle');
    component.postForm.controls.author.setValue('ardaauthor');
    component.postForm.controls.body.setValue('testing body paragraph that can be used for test cases ');
    expect(component.postForm.valid).toBeTruthy();
  });
  it('create new post on the table and call addpost one time ', (()=> {
    fixture.nativeElement.querySelector('#title').value = "NewTitlefortheblog";
    fixture.nativeElement.querySelector('#author').value = "Arda Gokalp ";
    fixture.nativeElement.querySelector('#Body').value = "testing body paragraph that can be used for test cases"
    fixture.nativeElement.querySelector('.submitbutton').disabled = false;
    spyOn(component,"addPost").and.callThrough();
    fixture.nativeElement.querySelector('.submitbutton').click();
    component.updateSource();
    fixture.detectChanges()
    expect(component.addPost).toHaveBeenCalledTimes(1);
   }));
   it('deletepost must remove an post from the postlist', () => {
    let post1 = new Post("denemetitle","denemepost","bodypost");
    component.postList.push(post1);

    spyOn(component,"deletePost").and.callFake(() => {component.postList.pop()}).and.callThrough();
    component.deletePost(post1);
    expect(component.deletePost).toHaveBeenCalledTimes(1);
  });
   it('checkresponse always must return a object that is instace of post', () => {
    let post1 = component.checkResponse({
        "id": -1865174072,
        "title": "asdsadsadsadasdsad",
        "author": "sadsadsadsa",
        "body": "dsadsadsadsadsadsadsadsa",
        "favoriete": "like",
        "createDate": "2022-08-09T20:40:20",
        "updateDate": "2022-08-09T20:40:20",
      })
    let post2 = component.checkResponse(new Post("arda","batmaz","gokalp"));
      expect(post1 instanceof Post).toBeTrue()
      expect(post2 instanceof Post).toBeTrue()
  });
  it("should add the post when addPost method called in this component", waitForAsync(() => {
    const newPost = new Post("arda","batmaz","gokalp");
    spyOn(postService, 'addPost').and.callFake((post : Post) => {return of(post)});
    component.addPost(newPost);
    fixture.detectChanges();
    expect(component.postList[0].ID).toEqual(newPost.ID);
  }));
  
  it("remove the post when removePost method called in this component", waitForAsync(() => {
    const newPost = new Post("arda","batmaz","gokalp");
    component.postList.push(newPost);
    spyOn(postService, 'deletePost').and.callFake((ID : number) => {return of(ID)});
    component.deletePost(newPost);
    fixture.detectChanges();
    expect(component.postList.length).toEqual(0);
  }));
  it("should get the all posts when  method called in this component", waitForAsync(() => {
    const newPost = new Post("arda","batmaz","gokalp");
    const newPost2 = new Post("arda2","batmaz","gokalp");
    let list: Post[]  = [];
    list.push(newPost);
    list.push(newPost2);

    spyOn(postService, 'getPosts').and.callFake(() => {return of(list)});
    component.getPosts();
    fixture.detectChanges();
    expect(component.postList.length).toEqual(list.length);
  }));
  it("should throw error and cancel the operation when addPost method called in this component", waitForAsync(() => {
    const newPost = new Post("arda","batmaz","gokalp");
    spyOn(postService, 'addPost').and.callFake((post : Post) => {return throwError(() => new Error("error"))});
    component.addPost(newPost);
    fixture.detectChanges();
    expect(component.postList[0]).toBeUndefined();
  }));

  it("should throw error and cancel the operation when get all posts method called in this component", waitForAsync(() => {
    const newPost = new Post("arda","batmaz","gokalp");
    const newPost2 = new Post("arda2","batmaz","gokalp");
    let list: Post[]  = [];
    list.push(newPost);
    list.push(newPost2);
    spyOn(postService, 'getPosts').and.callFake(() => {return throwError(() => new Error("error"))});
    component.getPosts();
    fixture.detectChanges();
    expect(component.postList.length).toEqual(0);
  }));
});
