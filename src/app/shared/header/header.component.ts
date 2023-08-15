import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription = Subscription.EMPTY;

  isSearch = false;
  isLogin = false;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogin = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(status => {
        this.isLogin = status;
      });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  changeLanguage(event: string): void {
    this.translateService.use(event);
  }

  showModalSearch(): void {
    this.isSearch = true;
  }

  cancelSearch(): void {
    this.isSearch = false;
  }

  gotoLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  gotoRegister(): void {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.authService.logout();
  }

}
