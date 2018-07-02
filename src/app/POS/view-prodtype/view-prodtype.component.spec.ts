
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProdtypeComponent } from './view-prodtype.component';

describe('ViewProdtypeComponent', () => {
  let component: ViewProdtypeComponent;
  let fixture: ComponentFixture<ViewProdtypeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProdtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProdtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
