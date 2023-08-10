import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MobileWebUI';
  darkmode = false;

  constructor(
    private translateService: TranslateService,
  ) {
    translateService.setDefaultLang('vn');
  }


  ChangeMode() {
    this.darkmode = !this.darkmode;
    document.documentElement.setAttribute('data-theme', this.darkmode ? 'dark' : 'light');
  }
}
