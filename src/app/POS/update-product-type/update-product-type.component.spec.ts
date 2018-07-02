import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductTypeComponent } from './update-product-type.component';

describe('UpdateProductTypeComponent', () => {
  let component: UpdateProductTypeComponent;
  let fixture: ComponentFixture<UpdateProductTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
