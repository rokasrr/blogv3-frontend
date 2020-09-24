import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AddPostService} from '../add-post/add-post.service';
import {ActivatedRoute} from '@angular/router';
import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {
  permaLink: number;
  post: PostPayload;
  constructor(private postService: AddPostService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    // this.router.params.subscribe(params => {
    //   this.permaLink = params.id;
    // });
    // this.postService.getPost(this.permaLink).subscribe((post: PostPayload) => {
    //   // this.postService.deletePost(post.id).subscribe();
    //   console.log('Istrinta puikiai', post.id);
    // }, (err: any) => {
    //   console.log('Failure Response');
    // });


  }}
