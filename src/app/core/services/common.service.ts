import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, startWith } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private API_SERVER = environment.API_SERVER_URL;
  private loadingStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  getLoadingStatusListener(): Observable<boolean> {
    return this.loadingStatusListener.asObservable();
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

  getProducts(paramsUrl: string ): Observable<{ status: string; length: number; data: Product[] }> {
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
}
