import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserTypeComponent } from './delete-user-type.component';

describe('DeleteUserTypeComponent', () => {
  let component: DeleteUserTypeComponent;
  let fixture: ComponentFixture<DeleteUserTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
