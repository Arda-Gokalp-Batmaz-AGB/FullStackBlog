import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { PostDataService,Post } from '../services/PostData.service';
import { EntryComponentComponent } from './entry-component.component';
import { TextPipe } from "src/app/pipes/text.pipe";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EntryComponentComponent', () => {
  let component: EntryComponentComponent;
  let fixture: ComponentFixture<EntryComponentComponent>;
  let postService : PostDataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryComponentComponent, TextPipe ],
      imports : [HttpClientTestingModule],
      providers : [PostDataService]
    })
    .compileComponents();
    const testPost = new Post("arda","deneme","deneme bodysi");
    fixture = TestBed.createComponent(EntryComponentComponent);
    component = fixture.componentInstance;
    component.post = testPost;
    postService = TestBed.inject(PostDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('remove method trigers delete request with component itself', (() => {
    const deleteButton : HTMLElement = fixture.debugElement.nativeElement.querySelector('.delete');
    spyOn(component.deleteRequest, 'emit');
    deleteButton.click();
    fixture.detectChanges();
    expect(component.deleteRequest.emit).toHaveBeenCalledWith(component.post);
  }));
  it('can be interacted with the component and like the component', (() => {
    const likeButton : HTMLElement = fixture.debugElement.nativeElement.querySelector('.like');
    likeButton.click();
    fixture.detectChanges();
    expect(component.post.favoriete).toBe('like');
  }));
  it('can be interacted with the component and dislike the component', (() => {
    const dislikeButton : HTMLElement = fixture.debugElement.nativeElement.querySelector('.dislike');
    dislikeButton.click();
    fixture.detectChanges();
    expect(component.post.favoriete).toBe('dislike');
  }));
  it('can be change between like and dislike when click them one by one will be dislike', (() => {
    const likeButton : HTMLElement = fixture.debugElement.nativeElement.querySelector('.like');
    const dislikeButton : HTMLElement = fixture.debugElement.nativeElement.querySelector('.dislike');
    likeButton.click();
    dislikeButton.click();
    fixture.detectChanges();
    expect(component.post.favoriete).toBe('dislike');
  }));
  it('can return to the non response state when double click to like', (() => {
    const likeButton : HTMLElement = fixture.debugElement.nativeElement.querySelector('.like');
    likeButton.click();
    likeButton.click();
    fixture.detectChanges();
    expect(component.post.favoriete).toBe('NaN');
  }));
  it('can update the current post of the component', (() => {
    let oldPost : Post =new Post("","","");
    Object.assign(oldPost,component.post);
    spyOn(postService, "updatePost").and.callFake((post : Post) => {return of(post)});
    component.updatePost(new Post("newtitle","newauthor","newbody"));
    fixture.detectChanges();
    expect(oldPost.equals(component.post)).toBeFalse();
  }));
});
