import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOwnersComponent } from './shop-owners.component';

describe('ShopOwnersComponent', () => {
  let component: ShopOwnersComponent;
  let fixture: ComponentFixture<ShopOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
