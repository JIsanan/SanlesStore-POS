
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveUsersComponent } from './archive-users.component';

describe('ArchiveUsersComponent', () => {
  let component: ArchiveUsersComponent;
  let fixture: ComponentFixture<ArchiveUsersComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
