import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

interface IModalData {
  activeIndex: number;
  product: Product;
}

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit{

  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  activeIndex = 0;
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

  ngOnInit(): void {
    this.activeIndex = this.nzModalData.activeIndex;
    this.product = this.nzModalData.product;
    console.log(this.product)
  }

}
