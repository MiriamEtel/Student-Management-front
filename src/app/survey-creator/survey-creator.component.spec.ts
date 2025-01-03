import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCreatorComponent } from './survey-creator.component';

describe('SurveyCreatorComponent', () => {
  let component: SurveyCreatorComponent;
  let fixture: ComponentFixture<SurveyCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyCreatorComponent]
    });
    fixture = TestBed.createComponent(SurveyCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
