import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService, cartItem } from 'src/app/core/services/cart.service';
import { breadCrumbItem } from 'src/app/models/breadcrumb';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{

  breadcrumb : breadCrumbItem = {
    title: 'home',
    icon: 'home',
    canNavigate: true,
    url: '/',
    child: {
      title: 'cart',
      icon: 'shopping-cart',
      canNavigate: true,
      url: '/cart',
      child: {
        title: 'checkOut',
        icon: '',
        canNavigate: false,
        url: '/',
        child: null
      }
    }
  }

  checkOutList: cartItem[] = [];
  userInfo: User = {
    _id: '',
    name: '',
    email: '',
    role: '',
  }

  discountCode = '';
  discountPercent = 0;

  paymentActive = '';
  paymentOptions = [
    { label: 'Creditcard', value: 'credit' },
    { label: 'Momo', value: 'momo' },
    { label: 'Zalo', value: 'zalo' },
    { label: 'Cash', value: 'cash' }
  ]

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkOutList = this.cartService.checkOutList;
    this.userInfo = this.authService.getUserInfo();
  }

  changePayment(type: string) {
    this.paymentActive = type;
  }

}
