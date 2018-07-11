
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveProdTypeComponent } from './archive-prod-type.component';

describe('ArchiveProdTypeComponent', () => {
  let component: ArchiveProdTypeComponent;
  let fixture: ComponentFixture<ArchiveProdTypeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveProdTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveProdTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
