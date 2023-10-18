import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { SectionComponent } from '../home/section/section.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ModalBuyNowComponent } from './modal-buy-now/modal-buy-now.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductItemComponent,
    SectionComponent,
    CatalogItemComponent,
    ModalProductComponent,
    ModalBuyNowComponent
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
