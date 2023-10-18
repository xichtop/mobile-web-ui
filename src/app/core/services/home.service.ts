import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  isLogin = false;
  categoryListener = new Subject<string>();

  constructor() { }

  getCategoryListener(): Observable<string> {
    return this.categoryListener.asObservable();
  }
  
}
