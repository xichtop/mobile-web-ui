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
    colors: [],
    sizes: [
      {size: ''}
    ],
    ratingAverage: 0,
    ratingQuantity: 0,
    category: ''
  }

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
    this.commonService.getProductById(productId).subscribe(data => this.product = data);
  }
}

