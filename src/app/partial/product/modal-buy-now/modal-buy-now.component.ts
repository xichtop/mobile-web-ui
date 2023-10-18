import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/services/common.service';
import { Product } from 'src/app/models/product';

interface IModalData {
  product: Product;
}

@Component({
  selector: 'app-modal-buy-now',
  templateUrl: './modal-buy-now.component.html',
  styleUrls: ['./modal-buy-now.component.scss']
})
export class ModalBuyNowComponent implements OnInit{

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

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
  };

  currentPrice = 0;
  currentColor = {
    color: '',
    price: 0,
    urlPicture: ['']
  };
  currentColorIndex = 0;

  currentSize = 0;
  quantity = 1;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.product = this.nzModalData.product;
    this.currentPrice = this.product.price - this.product.price * this.product.discountPercent / 100;
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

  onAddToCart() {
    if (this.authService.getIsAuthenticated()) {

      this.#modal.destroy({ data: 'this the result data' });
    } else {
      this.commonService.forceLogin();
    }
  }

  onGoToCart() {
    this.router.navigate([`cart`]);
  }

}
