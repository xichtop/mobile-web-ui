import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CountdownModule } from 'ngx-countdown';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PolicyCardComponent } from './policy-card/policy-card.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PolicyCardComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    IvyCarouselModule,
    CountdownModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PolicyCardComponent,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IvyCarouselModule,
    TranslateModule,
    CountdownModule,
    ProductCardComponent
  ]
})
export class SharedModule { }
