import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EntryComponentComponent } from '../entry-component/entry-component.component';
import { PostComponentComponent } from '../post-component/post-component.component';
import { Post } from '../services/PostData.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FavorieteDirective } from './favoriete.directive';
import { CommonModule } from "@angular/common";
import { By } from '@angular/platform-browser';

@Component({
  template: `
  <div id="Firstdiv" appFavoriete="like"><div><p>Testing_1</p></div></div>
  <div id="Seconddiv" appFavoriete="dislike"><div><p>Testing_2</p></div></div>
  <div id= "Thirddiv" appFavoriete="NaN"><div><p>Testing_3</p></div></div>
  `,
  styles :
  ['.disliked {border: 5px solid; border-color: #e11a1a;}', 
  '.liked {border: 5px solid;border-color: #45bf94;}',
  '.notresponded {border: 5px solid;border-color: #53ace4;}',
  'p {color: #ef01c3;}',
  '.hover {border-color: #ef01c3;}'
  ]
  
})
class TestComponent { }
describe('FavorieteDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent,FavorieteDirective],

      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });
  it('should create an instance of directive', () => {
    const directive = new FavorieteDirective();
    expect(directive).toBeTruthy();
  });
  it('should dislike and like flase when response is NaN', () => {
    const directive = new FavorieteDirective();
    directive.appFavoriete = "NaN";
    expect(directive.notresponded).toBeTruthy();
    expect(directive.disliked).toBeFalse();
    expect(directive.liked).toBeFalse();
  });

  it('There must be 3 directives in this template', () => {
    expect(fixture.debugElement.queryAll(By.directive(FavorieteDirective)).length).toBe(3);
  });

  it('Firstdiv should have green borders', () => {
    
    expect(fixture.debugElement.nativeElement.querySelector('#Firstdiv').classList.contains('liked')).toBeTrue();
  });

  it('Seconddiv should have red borders', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#Seconddiv').classList.contains('disliked')).toBeTrue();
  });
  it('Thirddiv should have blue borders', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#Thirddiv').classList.contains('notresponded')).toBeTrue();
  });
  it('borders become purple when hover', () => {
    let event = new MouseEvent('mouseenter', {
        bubbles: true,
        cancelable: true,
        view: window,
    });
    fixture.debugElement.query(By.directive(FavorieteDirective)).nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#Firstdiv').classList.contains('hover')).toBeTrue();
  });
  it('borders returns to old color when remove hover', () => {
    let event = new MouseEvent('mouseenter', {
        bubbles: true,
        cancelable: true,
        view: window,
    });
    fixture.debugElement.query(By.directive(FavorieteDirective)).nativeElement.dispatchEvent(event);
    let event2 = new MouseEvent('mouseleave', {
      bubbles: true,
      cancelable: true,
      view: window,
  });
  fixture.debugElement.query(By.directive(FavorieteDirective)).nativeElement.dispatchEvent(event2);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#Firstdiv').classList.contains('hover')).toBeFalse();
  });
});

