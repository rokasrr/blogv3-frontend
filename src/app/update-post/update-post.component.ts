import { Component, OnInit } from '@angular/core';
import {PostPayload} from '../add-post/post-payload';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPostService} from '../add-post/add-post.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  post: PostPayload;
  permaLink: number;
  addPostForm: FormGroup;
  title = new FormControl('');
  body = new FormControl('');
  constructor(private router: ActivatedRoute, private postService: AddPostService, private router2: Router) {

    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.post = {
      id: '',
      content: '',
      title: '',
      username: ''
    };
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.permaLink = params.id;
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
      this.title.setValue(this.post.title);
      this.body.setValue(this.post.content);
    }, (err: any) => {
      console.log('Failure Response');
    });
    // this.addPostForm.setValue({'title': this.post.title, 'body': this.post.content});
    // title = new FormControl('');
    // body = new FormControl('');
  }

  updatePost() {
    this.post.title = this.addPostForm.get('title').value;
    this.post.content = this.addPostForm.get('body').value;
    this.postService.updatePost(this.post).subscribe(data => {
      console.log('Post success');
      this.router2.navigateByUrl('/');
    }, error => {
      console.log('ERROR When posting');
    });
  }
}
