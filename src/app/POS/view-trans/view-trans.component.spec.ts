
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransComponent } from './view-trans.component';

describe('ViewTransComponent', () => {
  let component: ViewTransComponent;
  let fixture: ComponentFixture<ViewTransComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTransComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
