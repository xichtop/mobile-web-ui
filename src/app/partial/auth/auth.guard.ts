import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  canActivate(): boolean {
    const isAuth = this.authService.getIsAuthenticated();
    if (!isAuth) {
      this.commonService.forceLogin();
    }
    return isAuth;
  }
  
}
