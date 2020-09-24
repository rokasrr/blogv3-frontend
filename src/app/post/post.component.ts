import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPostService} from '../add-post/add-post.service';
import {PostPayload} from '../add-post/post-payload';
import {CommentPayload} from './comment-payload';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: PostPayload;
  permaLink: Number;
  comments: Observable<Array<CommentPayload>>;
  AddCommentForm: FormGroup;
  body = new FormControl('');
  commentPayload: CommentPayload;
  constructor(private router: ActivatedRoute, private postService: AddPostService, private authService: AuthService, private router2: Router) {
    this.AddCommentForm = new FormGroup({
      body: this.body
    });
    this.commentPayload = {
      id: '',
      content: '',
      answer: '',
      username: ''
    };
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permaLink = params.id;
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
    }, (err: any) => {
      console.log('Failure Response');
    });
    this.comments = this.postService.getAllComments(this.permaLink);
  }


  isAnswered(comment: CommentPayload): boolean {
    if (comment.answer == null) {
      return false;
    } else {
      return true;
    }
  }

  isAuthenticated(): boolean {
   return this.authService.isAuthenticated();
  }

  addComment() {
    this.commentPayload.content = this.AddCommentForm.get('body').value;
    this.postService.addComment(this.permaLink, this.commentPayload).subscribe(() => {
      console.log('comment OK');
      // location.reload();
      window.location.reload();
    }, error => {
      console.log('ERROR When posting');

    });
  }

  deleteComment(post: PostPayload, id: String) {
    this.postService.deleteComment(post, id).subscribe(() => {
      console.log('deteled comment: ' + id);
      location.reload();

    }, error => {
      console.log('failed deleting comment: ' + id);
    });
  }
}
