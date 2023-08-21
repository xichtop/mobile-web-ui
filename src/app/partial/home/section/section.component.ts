import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';

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
}
