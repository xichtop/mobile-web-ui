import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {

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
  // currentQuantity = 1;


  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const productId = params['id'];
      this.getProduct(productId);
    });
  }

  getProduct(productId: string) {
    this.commonService.getProductById(productId).subscribe(data => {
      this.product = data;
      this.currentColor = data.colors[0];
      this.currentPrice = data.price - data.price * data.discountPercent / 100;
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
}

