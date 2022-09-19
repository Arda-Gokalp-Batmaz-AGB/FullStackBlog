import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, Observable,catchError, throwError } from "rxjs";
import { from } from "rxjs";
import { Post } from "src/Post";
//import { Observable, of } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class PostDataService{
    url = "https://webapi-dotnetapiassignment-1241-feature.k8s.piworks.net/api/";//https://localhost:7055/api/
    constructor(private http: HttpClient){}

    getPosts() : Observable<Post[]>
    {
      return this.http.get<Post[]>(this.url+"Entry").pipe(
        map(
        response  => {
          console.log("response = " +  response);
          return response}
      ),
      catchError(this.handleError));
    }
    addPost(post : Post) : Observable<Post>
    {
      return this.http.post<Post>(this.url+"Entry", post as Post)
      .pipe(
        catchError(this.handleError)
      );
    }
    updatePost(post : Post) : Observable<Post>
    {
      return this.http.put<Post>(this.url+"Entry/"+post.ID, post)
      .pipe(
        catchError(this.handleError)
      );
    }
    deletePost(ID : number) : Observable<number>
    {
      const url = `${this.url+"Entry?id="}${ID}`;
      return this.http.delete<number>(url)
        .pipe(
          catchError(this.handleError)
        );
    }

    ConvertPosts(tempList : any[]) : Post[]
    {
      let answer : Post[] = [];
      for (let i = 0; i  < tempList.length; i ++) {
        const currentElement = tempList[i];
        const newElement =new Post(currentElement.title,currentElement.author,currentElement.body);
        if(currentElement.id==undefined)
        {
          newElement.ID = currentElement.ID;
        }
        else
        {
          newElement.ID = currentElement.id;
        }
        newElement.favoriete = currentElement.favoriete;
        newElement.createDate = currentElement.createDate;
        newElement.updateDate = currentElement.updateDate;
        answer.push(newElement)
      }
      return answer;
    }
    private handleError(error : HttpErrorResponse)
    {
      return throwError(() => error);
    }
}
