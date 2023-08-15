import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MobileWebUI';
  darkmode = false;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService
  ) {
    this.translateService.setDefaultLang('vn');
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

  ChangeMode() {
    this.darkmode = !this.darkmode;
    document.documentElement.setAttribute('data-theme', this.darkmode ? 'dark' : 'light');
  }
}
