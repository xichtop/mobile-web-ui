import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { Subscription } from 'rxjs';
import { CommonService } from './core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MobileWebUI';
  darkmode = false;
  isSpinning = false;

  private loadingStatusSub: Subscription = Subscription.EMPTY;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.translateService.setDefaultLang('vn');
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.loadingStatusSub = this.commonService.getLoadingStatusListener()
      .subscribe(status => {
        this.isSpinning = status;
      })
  }

  ngOnDestroy(): void {
    this.loadingStatusSub.unsubscribe();
  }

  ChangeMode() {
    this.darkmode = !this.darkmode;
    document.documentElement.setAttribute('data-theme', this.darkmode ? 'dark' : 'light');
  }
}
