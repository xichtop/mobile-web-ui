import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

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

  constructor(
    private http: HttpClient,
    private router: Router,  
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

  autoAuthUser() {
    const authInfo = this.getAuthDataFromLocalStorage();
    if (authInfo.token) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.getUserInfoByToken();
      this.authStatusListener.next(true);
    }
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  login(authData: {email: string, password: string}): void {
    const url = environment.API_SERVER_URL + 'auth/login';
    this.http.post<{status: string, data: {token: string, user: User}}>(url, authData)
      .subscribe(response => {
        if (response.data.token) {
          this.token = response.data.token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthDataInLocalStorage(this.token);
          this.getUserInfoByToken();
          this.router.navigate(['/']);
        }
      });
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
    this.router.navigate(['/']);
  }

  private saveAuthDataInLocalStorage(token: string): void {
    localStorage.setItem('access_token', token);
  }

  private clearAuthDataInLocalStorage(): void {
    localStorage.removeItem('access_token');
  }

  private getAuthDataFromLocalStorage(): {token: string} {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return {
        token: ""
      };
    }
    return {
      token: token
    }
  }

  getUserInfoByToken(): void {
    const url = environment.API_SERVER_URL + 'users/get-me';
    this.http.get<{ status: string; data: User }>(url)
      .subscribe((response) => {
        this.userInfo = response.data;
      }
    );
  }
}
