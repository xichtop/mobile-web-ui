import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';
import { UnauthorizedComponent } from 'src/app/shared/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
