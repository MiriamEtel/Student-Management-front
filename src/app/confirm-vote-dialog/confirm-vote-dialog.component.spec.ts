import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVoteDialogComponent } from './confirm-vote-dialog.component';

describe('ConfirmVoteDialogComponent', () => {
  let component: ConfirmVoteDialogComponent;
  let fixture: ComponentFixture<ConfirmVoteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmVoteDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmVoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
