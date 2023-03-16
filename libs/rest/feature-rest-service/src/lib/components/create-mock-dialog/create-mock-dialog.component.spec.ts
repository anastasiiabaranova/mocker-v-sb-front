import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMockDialogComponent } from './create-mock-dialog.component';

describe('CreateMockDialogComponent', () => {
  let component: CreateMockDialogComponent;
  let fixture: ComponentFixture<CreateMockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMockDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
