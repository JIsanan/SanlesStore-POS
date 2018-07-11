
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTransComponent } from './archive-trans.component';

describe('ArchiveTransComponent', () => {
  let component: ArchiveTransComponent;
  let fixture: ComponentFixture<ArchiveTransComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveTransComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
