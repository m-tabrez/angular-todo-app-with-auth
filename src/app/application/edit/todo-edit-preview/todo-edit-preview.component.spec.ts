import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditPreviewComponent } from './todo-edit-preview.component';

describe('TodoEditPreviewComponent', () => {
  let component: TodoEditPreviewComponent;
  let fixture: ComponentFixture<TodoEditPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoEditPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
