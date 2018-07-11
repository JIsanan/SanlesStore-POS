import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserTypeComponent } from './update-user-type.component';

describe('UpdateUserTypeComponent', () => {
  let component: UpdateUserTypeComponent;
  let fixture: ComponentFixture<UpdateUserTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUserTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
