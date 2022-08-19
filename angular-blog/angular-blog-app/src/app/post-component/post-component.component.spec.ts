import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { PostComponentComponent } from './post-component.component';
import { TextPipe } from "src/app/pipes/text.pipe"
import { of, throwError } from 'rxjs';
import { Post, PostDataService } from '../services/PostData.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EntryComponentComponent } from '../entry-component/entry-component.component';
import { FavorieteDirective } from '../directives/favoriete.directive';
describe('PostComponentComponent', () => {
  let component: PostComponentComponent;
  let fixture: ComponentFixture<PostComponentComponent>;
  let postService : PostDataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponentComponent,TextPipe,EntryComponentComponent,FavorieteDirective ],
      imports:[
        HttpClientModule,HttpClientTestingModule
      ],
      providers : [HttpClient,PostDataService]
    })
    .compileComponents();

    postService = TestBed.inject(PostDataService);
    fixture = TestBed.createComponent(PostComponentComponent);
    component = fixture.componentInstance;
   //component.ngAfterViewInit()
    //const test = fixture.debugElement.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("remove the post when removePost method called in post section component", waitForAsync(() => {
    const newPost = new Post("arda","batmaz","gokalp");
    component.postList.push(newPost);
    spyOn(postService, 'deletePost').and.callFake((ID : number) => {return of(ID)});
    component.deletePost(newPost);
    fixture.detectChanges();
    expect(component.postList.length).toEqual(0);
  }));
  it("should get the all posts when  method called in post section component", waitForAsync(() => {
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
  it("should throw error and cancel the operation when get all posts method called in post section component", waitForAsync(() => {
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
