import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService, cartItem } from 'src/app/core/services/cart.service';
import { breadCrumbItem } from 'src/app/models/breadcrumb';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  breadcrumb : breadCrumbItem = {
    title: 'home',
    icon: 'home',
    canNavigate: true,
    url: '/',
    child: {
      title: 'cart',
      icon: 'shopping-cart',
      canNavigate: false,
      url: '/cart',
      child: null
    }
  }

  cartList: readonly cartItem[] = [];
  allChecked: boolean = false;
  indeterminate: boolean = false;
  setOfCheckedId = new Set<string>();

  total: number = 0;

  private userId: string = '';
  private cartSub: Subscription = new Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cartList = this.cartService.cartList;
    this.userId = this.authService.getUserInfo()._id;
    this.cartSub = this.cartService.getCartListListener()
      .subscribe(data => {
        this.cartList = data;
      })
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  onChangeQuantity(event: number, index: number) {
    const body = {
      quantity: event
    }
    const productId = this.cartList[index]._id;
    this.cartService.updateQuantityCart(productId, body, this.userId);
  }
  
  onDeleteCart(index: number) {
    this.onItemChecked(this.cartList[index]._id, false, index);
    this.cartService.deleteCart(this.cartList[index]._id, this.userId);
  }

  goToProduct(index: number) {
    this.router.navigate([`catalog/${this.cartList[index].product.id}`]);
  }

  updateCheckedSet(id: string, checked: boolean, index: number): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      this.total += (this.cartList[index].quantity * this.cartList[index].product.price);
    } else {
      this.setOfCheckedId.delete(id);
      this.total -= (this.cartList[index].quantity * this.cartList[index].product.price);
    }
  }

  refreshCheckedStatus(): void {
    this.allChecked = this.cartList.every(item => this.setOfCheckedId.has(item._id));
    this.indeterminate = this.cartList.some(item => this.setOfCheckedId.has(item._id)) && !this.allChecked;
  }

  onAllChecked(value: boolean): void {
    this.cartList.forEach((item, index) => this.updateCheckedSet(item._id, value, index));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: string, checked: boolean, index: number): void {
    this.updateCheckedSet(id, checked, index);
    this.refreshCheckedStatus();
  }

  checkOut(): void {
    const orderList = this.cartList.filter(item => this.setOfCheckedId.has(item._id));
    this.cartService.checkOutList = orderList;
    this.router.navigate(['check-out'], {relativeTo: this.route} );
  }
}
