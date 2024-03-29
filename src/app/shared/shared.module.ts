import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ZorroModule } from '../zorro/zorro.module';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ZorroModule,
    TranslateModule
  ],
  exports: [
    ZorroModule,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    NotFoundComponent,
    UnauthorizedComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
