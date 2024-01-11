import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService, cartItem } from 'src/app/core/services/cart.service';
import { HomeService } from 'src/app/core/services/home.service';
import { User } from 'src/app/models/user';
import { Product } from 'src/app/models/product';
import { CommonService } from 'src/app/core/services/common.service';

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
  searchText = '';
  productSearchList: Product[] = [];
  private searchSubject = new Subject<string>();

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

  isOpenDrawer: boolean = false;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private homeService: HomeService,
    private cartService: CartService,
    private router: Router,
    private commonService: CommonService
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
        this.cartList = data.data;
        let length = 0;
        data.data.forEach(item => {
          length += item.quantity;
        })
        this.currentCart = length;
      })
    
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
        this.getListProduct();
      });
  }

  ngOnDestroy(): void {
    if (this.authStatusSub) this.authStatusSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  navigateCatalog(event: string) {
    this.currentCategory = event;
    this.router.navigate([`/catalog`], { queryParams: { type: event } });
    this.checkAndCloseDrawer();
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
    this.checkAndCloseDrawer();
  }

  changeLanguage(event: string): void {
    this.translateService.use(event);
    this.checkAndCloseDrawer();
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
    this.checkAndCloseDrawer();
  }

  gotoRegister(): void {
    this.currentCategory = '';
    this.router.navigate(['/auth/login']);
    this.checkAndCloseDrawer();
  }

  logout() {
    this.authService.logout();
    this.checkAndCloseDrawer();
  }

  indentityProduct(index: number, item: cartItem) {
    return item.product.id;
  }

  indentityProductSearch(index: number, item: Product) {
    return item._id;
  }

  openDrawer(): void {
    this.isOpenDrawer = true;
  }

  closeDrawer() {
    this.isOpenDrawer = false;
  }

  checkAndCloseDrawer() {
    if (this.isOpenDrawer) {
      this.isOpenDrawer = false;
    }
  }

  onChangeSearch(event: string) {
    this.searchText = event;
    this.searchSubject.next(this.searchText);
  }

  onClearSearch() {
    this.searchText = '';
    this.productSearchList = [];
  }

  onSearch() {
    this.router.navigate([`/catalog`], { queryParams: { search: this.searchText } });
    this.cancelSearch();
    this.onClearSearch();
  }

  getListProduct(): void {
    const params = [
      ['limit', 8],
      ['page', 0],
      ['search', this.searchText]
    ]
    this.commonService.getProducts(params).subscribe((data) => {
      this.productSearchList = data.data;
      this.commonService.changeLoadingStatus(false);
    });
  }

  goToCatalogFromSearch(productId: string) {
    this.router.navigate([`/catalog/${productId}`]);
    this.cancelSearch();
    this.onClearSearch();
  }

}
