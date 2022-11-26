import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./partial/home/home.module').then(m => m.HomeModule) },
  { path: 'catalog', loadChildren: () => import('./partial/catalog/catalog.module').then(m => m.CatalogModule) },
  { path: "**", redirectTo: "home"}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
