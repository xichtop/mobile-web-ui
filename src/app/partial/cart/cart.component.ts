import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService, cartItem } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartList: cartItem[] = [];
  cartSub: Subscription = new Subscription;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.getCartListListener()
      .subscribe(data => {
        this.cartList = data;
      })

  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

}
