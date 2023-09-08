import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() title = "";
  @Input() titleBG = "";
  @Input() products: Product[] | null = [];
  @Input() numberItemInRow = 4;
  @Input() buttonTitle = "";
  @Input() isCatalog = false;

  constructor(
    private router: Router
  ) {}

  viewProduct(product: Product) {
    this.router.navigate([`catalog/${product._id}`]);
  }

  navigateToCatalog() {
    if (this.buttonTitle === 'products') {
      this.router.navigate(['catalog']);
    } else {
      this.router.navigate(['catalog'], {queryParams: {type: this.buttonTitle}});
    }
  }
}
