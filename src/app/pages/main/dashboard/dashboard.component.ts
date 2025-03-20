import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import {PostService} from '../../../core/services/post.service';
import {Post} from '../../../core/interfaces/post';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  postService = inject(PostService);
  router = inject(Router);
  posts: WritableSignal<Post[]> = this.postService.posts;

  async ngOnInit() {
    await this.postService.getAllPosts();
  }

  createPost() {
    this.router.navigate(['main/create-post']).then();
  }

  async deletePost(id: string) {
    await this.postService.deletePost(id);
    this.posts.update(posts => posts.filter(post => post._id !== id));
  }

  viewPost(_id: string) {
    this.router.navigate(['main/post-detail', _id]).then();
  }
}
