import {Component} from '@angular/core';
import {PostService} from '../../../core/services/post.service';
import {Post} from '../../../core/interfaces/post';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  posts!: Post[];
  constructor(private postService: PostService) { }

  async ngOnInit() {
    this.posts = await this.postService.getAllPosts();
  }

}
