import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeDetailsComponent } from './user-type-details.component';

describe('UserTypeDetailsComponent', () => {
  let component: UserTypeDetailsComponent;
  let fixture: ComponentFixture<UserTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
