// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'pos'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('pos');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pos');
//   });
// });


import { AppComponent } from './app.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToastMessageService } from './services/toast-message/toast-message.service';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NzMessageService, useValue: {} }, // Provide a mock NzMessageService
        { provide: ToastMessageService, useValue: {} } // Provide a mock ToastMessageService
      ]
    });
    component = TestBed.inject(AppComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
})