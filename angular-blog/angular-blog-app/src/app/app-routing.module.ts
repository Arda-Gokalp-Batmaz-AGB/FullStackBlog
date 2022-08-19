import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrySectionComponentComponent } from './entry-section-component/entry-section-component.component';
import { PostComponentComponent } from './post-component/post-component.component';
export const routes: Routes = [
  {path:'entrysection',component:EntrySectionComponentComponent,},
  {path:'postsection',component:PostComponentComponent},
  {path: '', redirectTo: '/entrysection', pathMatch: 'full'},
  {path: '**', redirectTo: '/entrysection', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
//