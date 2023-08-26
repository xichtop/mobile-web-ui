import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';

const routes: Routes = [
  { path: '', component: ProductComponent},
  { 
    path: ':id', 
    component: CatalogItemComponent
  },
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
