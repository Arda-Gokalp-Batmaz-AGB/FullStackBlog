import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { EntryComponentComponent } from '../entry-component/entry-component.component';
import { Post, PostDataService } from '../services/PostData.service';
import { TextPipe } from './text.pipe';

describe('TextPipe', () => {
  let component: EntryComponentComponent;
  let fixture: ComponentFixture<EntryComponentComponent>;
  let postService : PostDataService;
  let pipe : TextPipe;
  let testString = "This is a testing text that is used for test cases";
  beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ EntryComponentComponent, TextPipe ],
    imports : [HttpClientTestingModule],
    providers : [PostDataService]
  })
  .compileComponents();
  pipe= new TextPipe();
  const testPost = new Post("arda","deneme","deneme bodysi");
  fixture = TestBed.createComponent(EntryComponentComponent);
  component = fixture.componentInstance;
  component.post = testPost;
  fixture.detectChanges();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should cut the body content of entry component from 5 character', (() => {
    const bodyElement : HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#body');
    let content = bodyElement.textContent;
    const pipe = new TextPipe();
    if(content == null)
      content="";
    expect(pipe.transform(content,5)).toBe(content.substring(0,5)+"...");
  }));

  it('text pipeline check', () => {
    expect(pipe.transform(testString,9)).toBe("This is a...");
  });
  it('text pipeline check_2', () => {
    expect(pipe.transform(testString,0)).toBe("...");
  });
  it('text pipeline check_3', () => {
    expect(pipe.transform(testString,-1)).toBe(testString);
  });
  it('text pipeline check_4', () => {
    expect(pipe.transform(testString,-2)).toBe(testString);
  });
  it('text pipeline check_5', () => {
    expect(pipe.transform(testString,500)).toBe(testString);
  });
  it('text pipeline check_6', () => {
    expect(pipe.transform("",0)).toBe("");
  });
  it('text pipeline check_7', () => {
    expect(pipe.transform("")).toBe("");
  });
});
