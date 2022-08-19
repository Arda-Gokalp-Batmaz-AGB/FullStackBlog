import { AfterViewInit, Component, OnInit, ViewChild,Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {EntryComponentComponent} from 'src/app/entry-component/entry-component.component';
import { Post } from '../services/PostData.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PostDataService } from '../services/PostData.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-entry-section-component',
  templateUrl: './entry-section-component.component.html',
  styleUrls: ['./entry-section-component.component.css']
})
export class EntrySectionComponentComponent implements OnInit, AfterViewInit {

  constructor(protected postDataService : PostDataService, private formBuilder : FormBuilder) { }
  

  postList : Post[] = [];
  postForm : FormGroup | any;
  ngOnInit(): void {
    this.getPosts();
    this.postForm = this.formBuilder.group(
      {
        title : this.formBuilder.control('',Validators.compose([
         Validators.required,
         Validators.minLength(5),
         Validators.maxLength(20),
         Validators.pattern('^[A-Za-z0-9_-]*$'),
        ])),
        author : this.formBuilder.control('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z].*'),
          Validators.minLength(4),
          Validators.maxLength(16),
        ])),
        body : this.formBuilder.control('', Validators.compose([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(100),
        ])),
      }
    );
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  dataSource = new MatTableDataSource<Post>(this.postList);

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Post>(this.postList);
    this.dataSource.paginator = this.paginator;
  }
  tableFormat = ["title","author","body","options"];

  getPosts() : void
  {
    this.postDataService.getPosts().subscribe({
      complete: () => { console.log("GET all completed sucessfully")}, // completeHandler
      error: () => { console.log("Error in GET All")},    // errorHandler 
      next: (response: Post[]) => {  
        const tempList = response; 
        this.postList=this.postDataService.ConvertPosts(tempList).concat([]);
        this.updateSource();
      }, 
  });
  }
  addPost(sentPost : any) : void
  {
    console.log(sentPost);
    console.log("sentPost");
    let newpost=new Post(sentPost.title,sentPost.author,sentPost.body);
    this.postDataService.addPost(newpost).subscribe({
      complete: () => { console.log("POST completed sucessfully") }, // completeHandler
      error: () => { console.log("Error in POST") }, 
      next: (post : Post) => {

      post=this.checkResponse(post)
        
      this.postList.push(post); 
      this.updateSource();
    }});
  }
  checkResponse(post : any) : Post
  {
    if(!(post instanceof Post))
    {
      post=this.postDataService.ConvertPosts([post])[0]
    }
    return post;
  }
  // updatePost() : void
  // {
  // }
  deletePost(post : Post) :void
  {
    // this.postDataService
    // .deletePost(post)
    // .subscribe(removePost => {
    //   this.postList=this.postList.filter(currentPost => currentPost.equals(post)!=true).concat([]);
    //   this.updateSource();
    // });;

    this.postDataService
    .deletePost(post.ID)
    .subscribe(removePostID => {
      this.postList=this.postList.filter((currentPost : Post)=> currentPost.ID!=removePostID).concat([]);
      this.updateSource() ;
    });;
  }
  updateSource() : void
  {
    this.dataSource.data = this.postList;
  }
}
