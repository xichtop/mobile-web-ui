import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ZorroModule } from '../zorro/zorro.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
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
    TranslateModule
  ]
})
export class SharedModule { }
