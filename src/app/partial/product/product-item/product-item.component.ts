import { Component, Input, OnDestroy } from '@angular/core';
import { Product } from '../../../models/product';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnDestroy {
  @Input() product: Product = {
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
        urlPicture: []
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
  currentLanguage = 'vn';
  changeLangSubscription: Subscription = new Subscription;

  constructor (
    private translate: TranslateService
  ) {
    this.changeLangSubscription = this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnDestroy(): void {
    if (this.changeLangSubscription) {
      this.changeLangSubscription.unsubscribe();
    }
  }
}
