import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './partial/home/home.component';
import { AuthGuard } from './partial/auth/auth.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
    path: 'auth', 
    loadChildren: () => import('./partial/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'catalog', 
    loadChildren: () => import('./partial/product/product.module').then(m => m.ProductModule)
  },
  { 
    path: 'cart', 
    loadChildren: () => import('./partial/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
