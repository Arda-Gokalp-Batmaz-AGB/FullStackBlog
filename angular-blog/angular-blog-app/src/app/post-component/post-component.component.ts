import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {EntryComponentComponent} from 'src/app/entry-component/entry-component.component';
import { EntrySectionComponentComponent } from '../entry-section-component/entry-section-component.component';
import { PostDataService} from '../services/PostData.service';
import { Post } from 'src/Post';
@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit  {

  constructor(protected postDataService : PostDataService) { }
  postList : Post[] = [];
  ngOnInit(): void {
   this.getPosts();
  }
  getPosts() : void
  {
    this.postDataService.getPosts().subscribe({
      complete: () => { console.log("GET all completed sucessfully")}, 
      error: () => { console.log("Error in GET All")},  
      next: (response: Post[]) => {  
        const tempList = response; 
        this.postList=this.postDataService.ConvertPosts(tempList).concat([]);
      },     
  });
  }
  deletePost(post : Post) : void
  {
    this.postDataService
    .deletePost(post.ID)
    .subscribe(removePostID => {
      this.postList=this.postList.filter((currentPost : Post)=> currentPost.ID!=removePostID).concat([]);
    });;
  }
}
