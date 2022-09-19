import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Location } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntrySectionComponentComponent } from './entry-section-component/entry-section-component.component';
import { PostComponentComponent } from './post-component/post-component.component';
import { EntryComponentComponent } from './entry-component/entry-component.component';
import { FormBuilder } from '@angular/forms';
import { Post } from 'src/Post';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app-routing.module';
import { Router, RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let container :HTMLElement;
  let router: Router;
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers : [RouterModule],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    container = fixture.nativeElement.querySelector('.container');
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-blog-app'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-blog-app');
  });

  it('should render main container', () => {
    expect(container).toBeTruthy();
  });
  it('container should create entrysection and postsections buttons', () => {
    const buttons = container.querySelectorAll("button");;
    const buttonEntrySection = buttons[0];
    const buttonPostSection = buttons[1];
    expect(buttonEntrySection.textContent).toContain('Entry Section');
    expect(buttonPostSection.textContent).toContain('Post Section');
  });

  it('contains routers of entrysection and postsection', () => {
    const buttons = container.querySelectorAll("button");
    const buttonEntrySection = buttons[0];
    const buttonPostSection = buttons[1];
    expect(buttonEntrySection.getAttribute('routerlink')).toContain('entrysection');
    expect(buttonPostSection.getAttribute('routerlink')).toContain('postsection');
  });
  it('navigate to "" redirects you to /entrysection', fakeAsync(() => {
    tick(50);
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/entrysection");
    });
  }));

  it('Entry Section button navigates you to /entrysection', fakeAsync(() => {
    tick(50);
    const buttonEntrySection : HTMLElement = fixture.nativeElement.querySelector("#entryrouter");
    router.navigate([buttonEntrySection.getAttribute('routerlink')]).then(() => {
      expect(location.path()).toBe("/entrysection");
    });
  }));
  it('Post Section button navigates you to /postsection', fakeAsync(() => {
    tick(50);
    const buttonEntrySection : HTMLElement = fixture.nativeElement.querySelector("#postrouter");
    router.navigate([buttonEntrySection.getAttribute('routerlink')]).then(() => {
      expect(location.path()).toBe("/postsection");
    });
  }));
});
