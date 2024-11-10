import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationSelectionComponent } from './decoration-selection.component';

describe('DecorationSelectionComponent', () => {
  let component: DecorationSelectionComponent;
  let fixture: ComponentFixture<DecorationSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecorationSelectionComponent]
    });
    fixture = TestBed.createComponent(DecorationSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
