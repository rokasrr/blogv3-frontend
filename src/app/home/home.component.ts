import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PostPayload} from '../add-post/post-payload';
import {AddPostService} from '../add-post/add-post.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postPayload: PostPayload;
  posts: Observable<Array<PostPayload>>;
  constructor(private postService: AddPostService, private router: Router, private authService: AuthService) {
    this.postPayload = {
      id: '',
        content: '',
        title: '',
        username: ''
    };
  }

  ngOnInit() {
    this.posts = this.postService.getAllPosts();
  }

  deletePost(post: number) {
    this.postPayload.id = post.toString();

    this.postService.deletePost(post.toString()).subscribe(data => {
        console.log('Successfuly deleted.');
        location.reload();


    }, error => {
      console.log(error);
      console.log('error when deleting');
      }
      );
    this.router.navigate(['/']);
  }

  isAuthenticated() {
  return this.authService.isAuthenticated();
  }

  // editPost(postPayload: PostPayload) {
  //   this.router.navigateByUrl('/updatePost');
  //
  //   this.postService.updatePost(postPayload).subscribe( (data: PostPayload) => {
  //
  //   });
  // Commented because it is not needed anymore. Works fine.
  // }
}
