import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPointsComponent } from './class-points.component';

describe('ClassPointsComponent', () => {
  let component: ClassPointsComponent;
  let fixture: ComponentFixture<ClassPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassPointsComponent]
    });
    fixture = TestBed.createComponent(ClassPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
