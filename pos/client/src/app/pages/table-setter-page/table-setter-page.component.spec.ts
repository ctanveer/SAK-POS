import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSetterPageComponent } from './table-setter-page.component';

describe('TableSetterPageComponent', () => {
  let component: TableSetterPageComponent;
  let fixture: ComponentFixture<TableSetterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableSetterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSetterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
