
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveProdComponent } from './archive-prod.component';

describe('ArchiveProdComponent', () => {
  let component: ArchiveProdComponent;
  let fixture: ComponentFixture<ArchiveProdComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
