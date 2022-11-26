import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  private getHeaders(): Object {
    const headers = new HttpHeaders();
    headers
      .set("Content-Type", "application/json; charset=utf-8")
      .set("authorization", 'Bearer ' + localStorage.getItem('access_token'));
    return headers;
  }

  public getListProducts(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(environment.API_SERVER_URL + 'product', headers);
  }
}
