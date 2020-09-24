import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from './add-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');
  constructor(private formBuilder: FormBuilder, private addPostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: ''
    };
  }

  ngOnInit(): void {
  }

  addPost() {
    this.postPayload.content = this.addPostForm.get('body').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    this.addPostService.addPost(this.postPayload).subscribe(data => {

        console.log('Post success');
        this.router.navigateByUrl('/');

    }, error => {
      console.log('ERROR When posting');

    });
  }
}

