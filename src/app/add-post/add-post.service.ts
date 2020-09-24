import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PostPayload} from './post-payload';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CommentPayload} from '../post/comment-payload';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  addPost(postPayload: PostPayload) {
  return this.httpClient.post('http://localhost:8080/api/posts/post/', postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
     return this.httpClient.get<Array<PostPayload>>('http://localhost:8080/api/posts/all');
  }

  // tslint:disable-next-line:ban-types
  getPost(permaLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/posts/get/' + permaLink);
  }

  deletePost(permaLink: String) {
    return this.httpClient.post('http://localhost:8080/api/posts/delete/' + permaLink, {id: permaLink});

  }

  updatePost(postPayload: PostPayload) {
    return this.httpClient.post('http://localhost:8080/api/posts/update/' + postPayload.id, postPayload);
  }

  getAllComments(permaLink: Number): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>('http://localhost:8080/api/posts/showcomments/' + permaLink);
  }

  getComment(permaLink: number): Observable<CommentPayload> {
    return this.httpClient.get<CommentPayload>('http://localhost:8080/api/posts/showcomment/' + permaLink);
  }

  updateComment(comment: CommentPayload) {
    return this.httpClient.post('http://localhost:8080/api/posts/updatecomment', comment);
  }

  addComment(permaLink: Number, commentPayload: CommentPayload) {
    return this.httpClient.post('http://localhost:8080/api/posts/comment/' + permaLink, commentPayload);
  }

  deleteComment(post: PostPayload, id: String) {
    return this.httpClient.post('http://localhost:8080/api/posts/deletecomment/' + id, post);
  }
}

