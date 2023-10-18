import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBuyNowComponent } from './modal-buy-now.component';

describe('ModalBuyNowComponent', () => {
  let component: ModalBuyNowComponent;
  let fixture: ComponentFixture<ModalBuyNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBuyNowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBuyNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
