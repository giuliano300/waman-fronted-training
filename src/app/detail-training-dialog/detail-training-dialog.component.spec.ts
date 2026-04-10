import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTrainingDialogComponent } from './detail-training-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: DetailTrainingDialogComponent;
  let fixture: ComponentFixture<DetailTrainingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTrainingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTrainingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
