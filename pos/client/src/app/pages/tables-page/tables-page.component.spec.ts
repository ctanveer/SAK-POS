import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesPageComponent } from './tables-page.component';

describe('TablesPageComponent', () => {
  let component: TablesPageComponent;
  let fixture: ComponentFixture<TablesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
