import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductItemComponent } from './product-item/product-item.component';

const routes: Routes = [
  { path: 'all', component: ProductComponent },
  { path: ':type', component: ProductComponent},
  { 
    path: 'product/:id', 
    component: ProductItemComponent
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
