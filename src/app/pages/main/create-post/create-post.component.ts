import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {PostService} from '../../../core/services/post.service';
import {Post} from '../../../core/interfaces/post';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-post',
  imports: [
    FormsModule
  ],
  templateUrl: './create-post.component.html',
  standalone: true,
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  post: Post = {
    title: '',
    body: '',
  } as Post;

  constructor(private postService: PostService,
              private router: Router) {
  }

  async createPost() {
    if (!this.post.title || !this.post.body) {
      alert('Please fill in all fields');
      return;
    }
    await this.postService.createPost(this.post);
    this.router.navigate(['main/dashboard']).then();
  }

}
