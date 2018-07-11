import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdTypeDetailsComponent } from './prod-type-details.component';

describe('ProdTypeDetailsComponent', () => {
  let component: ProdTypeDetailsComponent;
  let fixture: ComponentFixture<ProdTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
