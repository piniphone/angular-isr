import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/post/post.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    data: {revalidate: 5},
  },
  {
    path: 'post/:id',
    component: PostComponent,
    data: {revalidate: 5},
  },
];

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule, 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
