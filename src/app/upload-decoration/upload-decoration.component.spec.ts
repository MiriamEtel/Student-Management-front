import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDecorationComponent } from './upload-decoration.component';

describe('UploadDecorationComponent', () => {
  let component: UploadDecorationComponent;
  let fixture: ComponentFixture<UploadDecorationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDecorationComponent]
    });
    fixture = TestBed.createComponent(UploadDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
