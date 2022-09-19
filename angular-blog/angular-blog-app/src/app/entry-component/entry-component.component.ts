import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Post } from 'src/Post';
import { PostDataService } from '../services/PostData.service';
@Component({
  selector: 'app-entry-component',
  templateUrl: './entry-component.component.html',
  styleUrls: ['./entry-component.component.css']
})
export class EntryComponentComponent {

  @Input()
  post!: Post;
  @Output() deleteRequest = new EventEmitter<Post>();
  constructor(protected postDataService : PostDataService) {}

  updatePost(currentPost : Post) : void
  {
    this.postDataService.updatePost(currentPost).subscribe(x => {
      const updatedPost = this.postDataService.ConvertPosts([x])[0];
      Object.assign(this.post,updatedPost)
    });
  }
  onDelete(): void
  {
    this.deleteRequest.emit(this.post);
  }
  interecactionPost(interecactionType : string) : void
  {
    if(this.post.favoriete==interecactionType)
    {
      this.post.favoriete="NaN";
    }
    else
    {
      this.post.favoriete=interecactionType;
    }
    this.updatePost(this.post);
  }

}


