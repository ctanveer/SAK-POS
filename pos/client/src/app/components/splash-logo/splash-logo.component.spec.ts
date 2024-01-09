import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashLogoComponent } from './splash-logo.component';

describe('SplashLogoComponent', () => {
  let component: SplashLogoComponent;
  let fixture: ComponentFixture<SplashLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplashLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SplashLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
