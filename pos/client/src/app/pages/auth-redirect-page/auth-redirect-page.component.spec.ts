import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRedirectPageComponent } from './auth-redirect-page.component';

describe('AuthRedirectPageComponent', () => {
  let component: AuthRedirectPageComponent;
  let fixture: ComponentFixture<AuthRedirectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthRedirectPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthRedirectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
