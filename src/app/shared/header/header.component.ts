import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService, cartItem } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';
import { HomeService } from 'src/app/core/services/home.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription = Subscription.EMPTY;
  private categorySub: Subscription = Subscription.EMPTY;
  private cartSub: Subscription = Subscription.EMPTY;

  categoryList = ['iphone', 'ipad', 'mac', 'watch', 'airpod', 'accessory'];

  isSearch = false;
  isLogin = false;
  userInfo: User = {
    _id: '',
    name: '',
    email: '',
    role: '',
  };

  currentCategory = '';
  currentCart = 0;
  cartList : cartItem[] = [];

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private homeService: HomeService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogin = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(status => {
        this.isLogin = status;
        this.userInfo = this.authService.getUserInfo();
      });

    this.categorySub = this.homeService.getCategoryListener()
      .subscribe(category => {
        this.currentCategory = category;
      });

    this.cartSub = this.cartService.getCartListListener()
      .subscribe(data => {
        this.cartList = data;
        let length = 0;
        data.forEach(item => {
          length += item.quantity;
        })
        this.currentCart = length;
      })
  }

  ngOnDestroy(): void {
    if (this.authStatusSub) this.authStatusSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  navigateCatalog(event: string) {
    this.currentCategory = event;
    this.router.navigate([`/catalog`], { queryParams: { type: event } });
  }

  goToCatalog(productId?: string) {
    if (productId) {
      this.router.navigate([`/catalog/${productId}`]);
    } else {
      this.router.navigate([`/catalog`]);
    }
  }

  goToCart() {
    this.router.navigate([`cart`]);
  }

  changeLanguage(event: string): void {
    this.translateService.use(event);
  }

  showModalSearch(): void {
    this.isSearch = true;
  }

  cancelSearch(): void {
    this.isSearch = false;
  }

  goHome(): void {
    this.currentCategory = '';
    this.router.navigate(['/']);
  }

  gotoLogin(): void {
    this.currentCategory = '';
    this.router.navigate(['/auth/login']);
  }

  gotoRegister(): void {
    this.currentCategory = '';
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.authService.logout();
  }

  indentityProduct(index: number, item: cartItem) {
    return item.product.id;
  }

}
