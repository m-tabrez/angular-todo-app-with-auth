import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditPreviewComponent } from './note-edit-preview.component';

describe('NoteEditPreviewComponent', () => {
  let component: NoteEditPreviewComponent;
  let fixture: ComponentFixture<NoteEditPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteEditPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
