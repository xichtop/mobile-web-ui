import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { SectionComponent } from '../home/section/section.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductItemComponent,
    SectionComponent,
    CatalogItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    SharedModule
  ],
  exports: [
    ProductItemComponent,
    SectionComponent
  ]
})
export class ProductModule { }
