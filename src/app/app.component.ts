import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { Observable } from 'rxjs';
import { CommonService } from './core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MobileWebUI';
  darkmode = false;
  _isLoading$ = new Observable<boolean>;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.translateService.setDefaultLang('vn');
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this._isLoading$ = this.commonService._isLoading$;
  }

  ChangeMode() {
    this.darkmode = !this.darkmode;
    document.documentElement.setAttribute('data-theme', this.darkmode ? 'dark' : 'light');
  }
}
