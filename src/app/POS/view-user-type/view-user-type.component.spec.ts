
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserTypeComponent } from './view-user-type.component';

describe('ViewUserTypeComponent', () => {
  let component: ViewUserTypeComponent;
  let fixture: ComponentFixture<ViewUserTypeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
