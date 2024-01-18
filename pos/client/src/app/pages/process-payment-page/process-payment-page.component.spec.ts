import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPaymentPageComponent } from './process-payment-page.component';

describe('ProcessPaymentPageComponent', () => {
  let component: ProcessPaymentPageComponent;
  let fixture: ComponentFixture<ProcessPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessPaymentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
