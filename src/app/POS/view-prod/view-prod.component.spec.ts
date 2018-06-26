
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProdComponent } from './view-prod.component';

describe('ViewProdComponent', () => {
  let component: ViewProdComponent;
  let fixture: ComponentFixture<ViewProdComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
