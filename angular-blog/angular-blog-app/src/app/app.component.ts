import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){}
  title = 'angular-blog-app';

  // route(adress : string = "t")protected router: Router
  // {
  //   this.router.navigateByUrl("/"+adress);
  //   console.log("Navigated to" + this.router.url)
  // }
}
