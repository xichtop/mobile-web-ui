import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzSliderValue } from 'ng-zorro-antd/slider';
import {  map, switchMap } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  arrayCarousel = [
    {
      id: 2,
      urlPicture:
        'https://shopdunk.com/images/uploaded/LINH%20CHERRYYYYYYY/danh%20m%E1%BB%A5c%20iphone%20ipad%20t7-10.jpg',
    },
    {
      id: 3,
      urlPicture:
        'https://shopdunk.com/images/uploaded/LINH%20CHERRYYYYYYY/Danh%20m%E1%BB%A5c%20PC.jpg',
    },
  ];

  categoryList = ['iphone', 'ipad', 'macbook', 'airpod', 'watch'];
  romList = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  ramList = ['6GB', '8GB', '12GB', '16GB'];
  sizeList = ['40MM', '41MM', '44MM', '45MM'];
  colorList = ['Black', 'Yellow', 'Pink', 'Green', 'Gray', 'White'];
  sortList = [
    { label: 'Giá từ cao đến thấp', value: '-currentPrice' },
    { label: 'Giá từ thấp đến cao', value: 'currentPrice' },
    { label: 'Bán chạy nhất', value: '-sold' },
    { label: 'Đánh giá tốt nhất', value: '-rate' },
  ];

  filterCount: number = 0;
  filterObj = {
    category: [''],
    price: [0, 80000000],
    rom: [''],
    size: [''],
    ram: [''],
    colors: ['']
  }
  currentSort = '-sold';

  isChangePrice = false;

  totalItems = 0;
  currentType = 'all';
  currentPage = 1;
  currentSize = 8;
  currentList: Product[] = [];

  arrPrice = [0, 80000000];

  constructor(
    private route: ActivatedRoute,
    // private productService: ProductService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(map(params => params.get('type') || ''))
      .subscribe(params => {
        if (params) {
          this.getProductList(params);
        } else {
          this.getProductList('all');
        }
      });

  }

  getProductList(type: string) {
    this.commonService.changeLoadingStatus(true);
    this.currentType = type;
    if (this.currentType === 'all') {
      const params = {
        limit: this.currentSize,
        page: this.currentPage,
        sort: this.currentSort
      }
      this.commonService.getProducts(params).subscribe((data) => {
        this.totalItems = data.length;
        this.currentList = data.data;
        this.commonService.changeLoadingStatus(false);
      });
    } else {
      const category$ = this.commonService.getCategoryBySortCode(
        this.currentType
      );
      category$
        .pipe(
          map((res) => res.data._id),
          switchMap((data) => {
            const params = {
              limit: this.currentSize,
              page: this.currentPage,
              category: data,
              sort: this.currentSort
            }
            return this.commonService.getProducts(params);
          })
        )
        .subscribe((data) => {
          this.totalItems = data.length;
          this.currentList = data.data;
          this.commonService.changeLoadingStatus(false);
        });
    }
  }

  changePaginate(event: number) {
    this.currentPage = event;
    this.getProductList(this.currentType);
  }

  changeSize(event: number) {
    this.currentSize = event;
    this.getProductList(this.currentType);
  }

  moveToFilter() {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    })
  }

  chooseItemFilter(event: string, type: string) {
    const index = this.isChooseItemFilter(event, type);
    const filterArr = this.switchFilter(type);
    if ( index >= 0) {
      filterArr.splice(index, 1);
      if (filterArr.length === 1) {
        this.filterCount -= 1;
      }
      this.assignFilter(filterArr, type);
    } else {
      if (filterArr.length === 1) {
        this.filterCount += 1;
      }
      filterArr.push(event);
      this.assignFilter(filterArr, type);
    }
  }

  clearFilterItem(type: string) {
    this.assignFilter([''], type);
    this.filterCount -= 1;
  }

  assignFilter(array: string[], type: string) {
    switch (type) {
      case 'category': this.filterObj.category = array;
      break;
      case 'rom': this.filterObj.rom = array;
      break;
      case 'ram': this.filterObj.ram = array;
      break;
      case 'color': this.filterObj.colors = array;
      break;
      case 'size': this.filterObj.size = array;
      break;
      // case 'pin': this.filterObj.pin  = array;
    }
  }

  switchFilter(type: string): string[] {
    switch (type) {
      case 'category': return this.filterObj.category;
      case 'rom': return this.filterObj.rom;
      case 'ram': return this.filterObj.ram;
      case 'color': return this.filterObj.colors;
      case 'size': return this.filterObj.size;
      // case 'pin': return this.filterObj.pin;
    }
    return [];
  }

  isChooseItemFilter(event: string, type: string): number {
    const filterArr = this.switchFilter(type);
    return filterArr.indexOf(event);
  }

  onChangePrice(value: any): void {
    if (JSON.stringify(value) != JSON.stringify(this.arrPrice)) {
      this.filterObj.price = value;
      if (this.isChangePrice !== true) {
        this.filterCount += 1;
        this.isChangePrice = true;
      }
    } else {
      this.filterCount -= 1;
      this.isChangePrice = false;
    }
  }

  clearPrice() {
    this.filterObj.price = this.arrPrice;
    this.isChangePrice = false;
    this.filterCount -= 1;
  }
}
