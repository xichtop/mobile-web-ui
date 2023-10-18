import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, of, throwError } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private userInfo: User = {
    name: '',
    email: '',
    role: '',
  }
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private message: NzMessageService,
    private translateService: TranslateService
  ) {}

  getToken(): string {
    return this.token;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserInfo(): User {
    return this.userInfo;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }



  autoAuthUser() {
    const authInfo = this.getAuthDataFromLocalStorage();
    if (authInfo) {
      const now = new Date();
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.getUserAndNotify(authInfo.token, expiresIn);
      }
    }
  }

  getUserAndNotify(token: string, expiresIn: number) {
    this.token = token;
    this.isAuthenticated = true;
    this.setTimerToken(expiresIn / 1000);
    this.getUserInfoByToken().subscribe((res) => {
      this.userInfo = res.data;
      this.authStatusListener.next(true);
      this.router.navigate(['/']);
    });
  }

  login(authData: {email: string, password: string}): void {
    this.commonService.changeLoadingStatus(true);
    const url = environment.API_SERVER_URL + 'auth/login';
    this.http.post<{status: string, data: {token: string, expiresIn: number}}>(url, authData)
    .pipe(catchError(err => {
      this.commonService.changeLoadingStatus(false);
      this.translateService.get('message.loginFailed').subscribe((message) => {
        this.message.create('error', message);
      });
      return throwError(err);
    }))
    .subscribe(response => {
        console.log('Top', response);
        if (response.data.token) {
          const expiresInDuration = response.data.expiresIn;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + (expiresInDuration * 1000));
          this.saveAuthDataInLocalStorage(response.data.token, expirationDate);
          this.getUserAndNotify(response.data.token, expiresInDuration * 1000);
          this.commonService.changeLoadingStatus(false);
          this.translateService.get('message.login').subscribe(message => {
            this.message.create('success', message);
          })
        }
      })
      ;
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userInfo = {
      name: '',
      email: '',
      role: ''
    }
    this.clearAuthDataInLocalStorage();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
    this.translateService.get('message.logout').subscribe(message => {
      this.message.create('success', message);
    })
  }

  setTimerToken(duration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.translateService.get('message.tokenExpired').subscribe(message => {
        this.message.create('warning', message);
      })
      this.logout();
    }, duration * 1000);
  }

  private saveAuthDataInLocalStorage(token: string, expirationDate: Date): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('expiration_date', expirationDate.toISOString());
  }

  private clearAuthDataInLocalStorage(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiration_date');
  }

  private getAuthDataFromLocalStorage() {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('expiration_date');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  getUserInfoByToken(): Observable<{ status: string; data: User }> {
    const url = environment.API_SERVER_URL + 'users/get-me';
      return this.http.get<{ status: string; data: User }>(url);
  }
}
