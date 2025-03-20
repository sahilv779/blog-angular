import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {OAuthRedirectComponent} from './oauth-redirect/oauth-redirect.component';



export const MAIN_ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'post-detail/:id',
        component: PostDetailComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'create-post',
        component: CreatePostComponent
      },
      {
        path: 'oauth-redirect',
        component: OAuthRedirectComponent
      }
    ],
  },
  { path: '', redirectTo: 'post-detail', pathMatch: 'full' },
];
