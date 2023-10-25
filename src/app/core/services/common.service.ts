import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Observable, delay, map, of, startWith, switchMap } from 'rxjs';
import { Product, ProductParams } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private API_SERVER = environment.API_SERVER_URL;
  private loadingStatusListener = new BehaviorSubject(false);
  _isLoading$ : Observable<boolean> = this.loadingStatusListener.pipe(
    switchMap(isLoading => {
      if (!isLoading) {
        return of(false);
      } else {
        return of(true).pipe(delay(10));
      }
    })
  );

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private message: NzMessageService,
    private router: Router
  ) { }

  forceLogin() {
    this.translateService.get('message.forceLogin').subscribe(message => {
      this.message.create('warning', message);
    })
    this.router.navigate(['/auth/unauthorized']);
  }

  changeLoadingStatus(status: boolean) {
    this.loadingStatusListener.next(status);
  }

  getCategories(): Observable<{status: string, length: number, data: []}> {
    const url = this.API_SERVER + 'categories';
    return this.http.get<{status: string, length: number, data: []}>(url);
  }

  getCategoryBySortCode(code: string): Observable<{status: string, data: {_id: string}}> {
    const url = this.API_SERVER + 'categories/get-by-code/' + code;
    return this.http.get<{status: string, data: {_id: string}}>(url);
  }

  getProducts(paramObj: (any)[]): Observable<{ status: string; length: number; data: Product[] }> {
    let paramsUrl = '';
    for (let i = 0; i < paramObj.length; i++) {
      paramsUrl = paramsUrl + '&' + paramObj[i][0] + '=' + paramObj[i][1]
    }
    paramsUrl = paramsUrl.substring(1);
    const url = this.API_SERVER + 'products?' + paramsUrl;
    return this.http
      .get<{ status: string; length: number; data: Product[] }>(url);
  }

  getProductsByCategory(category: string, limit: number): Observable<Product[]> {
    const url = this.API_SERVER + 'categories/' + category + '/products?limit=' + limit;
    return this.http
      .get<{ status: string; length: number; data: Product[] }>(url)
      .pipe(map((res) => res.data));
  }

  getProductById(id: string): Observable<Product> {
    const url = this.API_SERVER + 'products/' + id;
    return this.http
      .get<{ status: string; data: Product }>(url)
      .pipe(map((res) => res.data));
  }
}
