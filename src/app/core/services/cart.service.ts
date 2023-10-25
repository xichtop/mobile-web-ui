import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface cartItem {
  _id: string,
  product: {
    id: string,
    title: string,
    urlPicture: string,
    colors: [],
    sizes: [],
    price: number
  },
  color: string,
  size: string,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private API_SERVER = environment.API_SERVER_URL;
  cartList: cartItem[] = [];
  checkOutList: cartItem[] = [];
  
  private cartListListener = new Subject<cartItem[]>();

  constructor(
    private http: HttpClient
  ) { }

  getCartListListener(): Observable<cartItem[]> {
    return this.cartListListener.asObservable();
  }

  getAllCart(userId: string): void {
    const url = this.API_SERVER + 'users/' + userId + '/carts';
    this.http.get<{status: string, length: number, data: []}>(url)
      .subscribe(res => {
        this.cartList = res.data;
        this.notifyUpdateCart();
      });
  }

  clearAllCart() {
    this.cartList = [];
    this.notifyUpdateCart();
  }

  updateQuantityCart(id: string, body: {quantity: number}, userId: string) {
    const url = this.API_SERVER + 'carts/' + id;
    this.http.patch(url, body)
      .subscribe(res => {
        this.getAllCart(userId);
      });
  }

  postCart(body: Object, userId: string) {
    const url = this.API_SERVER + 'carts';
    this.http.post(url, body)
      .subscribe(res => {
        this.getAllCart(userId);
      });
  }

  deleteCart(cartId: string, userId: string) {
    const url = this.API_SERVER + 'carts/' + cartId;
    this.http.delete(url)
      .subscribe(res => {
        this.getAllCart(userId);
      })
  }

  notifyUpdateCart() {
    this.cartListListener.next(this.cartList);
  }

}
