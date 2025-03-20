import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../core/services/post.service';
import {Post} from '../../../core/interfaces/post';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [
    DatePipe
  ],
  templateUrl: './post-detail.component.html',
  standalone: true,
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {

  id!: string;
  post!: Post;
  constructor(private route: ActivatedRoute,
              private postService: PostService) {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.id = params['id'];
      }
    );
  }

  async ngOnInit() {
    this.post = await this.postService.getPost(this.id);
  }
}
