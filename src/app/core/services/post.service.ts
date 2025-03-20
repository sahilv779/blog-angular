import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpService) { }

  async getPost(id: string): Promise<any> {
    return await this.http.get(id, {}, 'posts');
  }

  async getAllPosts(): Promise<any> {
    return await this.http.get('', {}, 'posts/my-posts');
  }
}
