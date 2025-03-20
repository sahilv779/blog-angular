import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpService} from './http.service';
import {Post} from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: WritableSignal<Post[]> = signal<Post[]>([]);

  constructor(private http: HttpService) { }

  async getPost(id: string): Promise<any> {
    return await this.http.get(id, {}, 'posts');
  }

  async getAllPosts(): Promise<any> {
    if(this.posts().length) {
      return;
    }
    const res: any = await this.http.get('', {}, 'posts/my-posts');
    this.posts.set(res);
  }

  async createPost(post: Post) {
    return await this.http.create(post, {}, 'posts/create');
  }

  async deletePost(id: string) {
    return await this.http.delete(id, {}, 'posts');
  }
}
