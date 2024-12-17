import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContributionSearchComponent } from './admin-contribution-search.component';

describe('AdminContributionSearchComponent', () => {
  let component: AdminContributionSearchComponent;
  let fixture: ComponentFixture<AdminContributionSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminContributionSearchComponent]
    });
    fixture = TestBed.createComponent(AdminContributionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
