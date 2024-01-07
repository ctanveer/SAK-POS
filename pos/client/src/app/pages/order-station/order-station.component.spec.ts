import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStationComponent } from './order-station.component';

describe('OrderStationComponent', () => {
  let component: OrderStationComponent;
  let fixture: ComponentFixture<OrderStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
