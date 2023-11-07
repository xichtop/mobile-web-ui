import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from 'src/app/core/services/common.service';
import { Product } from 'src/app/models/product';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ModalBuyNowComponent } from '../modal-buy-now/modal-buy-now.component';
import { addDays, formatDistance } from 'date-fns';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit, OnDestroy {

  product: Product = {
    _id: '',
    title: '',
    description: '',
    urlPicture: '',
    sold: 0,
    quantity: 0,
    price: 0,
    currentPrice: 0,
    discountPercent: 0,
    colors: [
      {
        color: '',
        price: 0,
        urlPicture: ['']
      }
    ],
    sizes: [
      {
        size: '',
        price: 0
      }
    ],
    ratingAverage: 0,
    ratingQuantity: 0,
    category: ''
  }
  currentPicture = 1;
  currentPrice = 0;
  currentColor = {
    color: '',
    price: 0,
    urlPicture: ['']
  };
  currentColorIndex = 0;

  currentSize = 0;

  currentLanguage = 'vn';
  changeLangSubscription: Subscription = new Subscription;

  addToProduct = false;

  listRelatedProduct: Product[] = [];

  data = [
    {
      author: 'Xich Top',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'Sản phẩm tuyệt vời',
      datetime: formatDistance(new Date(), addDays(new Date(), 1)),
      likes: 100,
      dislikes: 0
    },
    {
      author: 'Tien Toi',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'Đúng với mô tả',
      datetime: formatDistance(new Date(), addDays(new Date(), 2)),
      likes: 30,
      dislikes: 0
    }
  ];

  userInfo: User = {
    _id: '',
    name: '',
    email: '',
    role: '',
    photo: ''
  }

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private modal: NzModalService, 
    private viewContainerRef: ViewContainerRef,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {
    this.changeLangSubscription = this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
    this.userInfo = this.authService.getUserInfo();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const productId = params['id'];
      this.getProduct(productId);
    });
  }

  ngOnDestroy(): void {
    if (this.changeLangSubscription) {
      this.changeLangSubscription.unsubscribe();
    }
  }

  getProduct(productId: string) {
    this.commonService.getProductById(productId).subscribe(data => {
      this.product = data;
      this.currentColor = data.colors[0];
      this.currentPrice = data.price - data.price * data.discountPercent / 100;

      this.commonService.getProductsByCategory(this.product?.category, 4)
        .subscribe(res => {
          this.listRelatedProduct = res;
        })
    });
  }

  onChoosePicture(index: number) {
    this.currentPicture = index;
  }

  onChooseSize(index: number) {
    this.currentSize = index;
    const newPrice = this.product.price 
      + this.product.sizes[index].price 
      + this.product.colors[this.currentColorIndex].price;
    this.currentPrice = newPrice - newPrice * this.product.discountPercent / 100;
  }

  onChooseColor(index: number) {
    this.currentColorIndex = index;
    this.currentColor = this.product.colors[index];
    const newPrice = this.product.price 
      + this.product.colors[index].price
      + this.product.sizes[this.currentSize].price;
    this.currentPrice = newPrice - newPrice * this.product.discountPercent / 100;
  }

  onOpenProductModal(index: number): void {
    this.modal.create<ModalProductComponent>({
      nzTitle: '',
      nzContent: ModalProductComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        activeIndex: index,
        product: this.product
      },
      nzFooter: null,
      nzClosable: false,
      nzWidth: 1200,
      nzStyle: { top : '0', overFlow: 'scroll', height: '100vh'}
    });
  }

  onBuyNow() {
    this.modal.create<ModalBuyNowComponent>({
      nzTitle: '',
      nzContent: ModalBuyNowComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        product: this.product
      },
      nzFooter: null,
      nzClosable: true,
      nzWidth: 400,
      nzCentered: true,
    });
  }

  onGoToCart() {
    this.router.navigate([`cart`]);
  }
}

