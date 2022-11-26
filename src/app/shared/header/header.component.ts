import { Component, OnInit } from '@angular/core';

import { headerTitle } from '../../../assets/data/data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentCategory: number = 0;
  isHoverCategory: boolean = false;
  headerTitleList = headerTitle;

  constructor() { }

  ngOnInit(): void {
  }

  public onHoverCategory(index: number): void {
    this.isHoverCategory = true;
    this.currentCategory = index;
  }

  public onHoverSubtitle(): void {
    this.isHoverCategory = true;
  }

  public onLeaveCategory(): void {
    this.isHoverCategory = false;
    // const menu = document.getElementById("header-menu");
    // if (menu) {
    //   menu.style.display = "none";
    // }
  }

}
