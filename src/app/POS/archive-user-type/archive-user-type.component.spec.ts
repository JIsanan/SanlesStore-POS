
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveUserTypeComponent } from './archive-user-type.component';

describe('ArchiveUserTypeComponent', () => {
  let component: ArchiveUserTypeComponent;
  let fixture: ComponentFixture<ArchiveUserTypeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveUserTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
