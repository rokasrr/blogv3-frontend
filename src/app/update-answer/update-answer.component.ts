import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentPayload} from '../post/comment-payload';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPostService} from '../add-post/add-post.service';
import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})
export class UpdateAnswerComponent implements OnInit {
  comment: CommentPayload;
  permaLink: number;
  postLink: number;
  addPostForm: FormGroup;
  body = new FormControl('');
  constructor(private router: ActivatedRoute, private postService: AddPostService, private router2: Router) {
    this.addPostForm = new FormGroup({
      body: this.body
    });
    this.comment = {
      id: '',
    content: '',
    answer: '',
    username: ''
    };
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.permaLink = params.id;
      this.postLink = params.post;
    });
    this.postService.getComment(this.permaLink).subscribe((data: CommentPayload) => {
      this.comment = data;
      this.body.setValue(data.answer);
      console.log('OK when posting comment');
    }, (err: any) => {
      console.log('Failure Response');
    });
  }

  updateAnswer() {
    this.comment.answer = this.addPostForm.get('body').value;
    this.postService.updateComment(this.comment).subscribe();
    this.router2.navigateByUrl('/post/' + this.postLink);
  }
}
