import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductModule } from '../product/product.module';
import { SectionComponent } from './section/section.component';


@NgModule({
  declarations: [
    HomeComponent,
    SectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
