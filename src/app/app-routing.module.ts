import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'get-started',
    loadChildren: () => import('./page/auth-page/auth-page.module').then(m => m.AuthPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile-page/profile-page.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./page/chat-page/chat-page.module').then(m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
