import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'policy-card',
  templateUrl: './policy-card.component.html',
  styleUrls: ['./policy-card.component.scss']
})
export class PolicyCardComponent implements OnInit {

  @Input() policy = {
    name: "Miễn phí giao hàng",
    description: "Miễn phí ship với đơn hàng > 239K",
    icon: "fa-bag-shopping"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
