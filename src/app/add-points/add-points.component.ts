import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentPointsService } from '../student-points.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-points',
  templateUrl: './add-points.component.html',
  styleUrls: ['./add-points.component.scss'],
})
export class AddPointsComponent {
  addPointsForm: FormGroup;
  selectedFile: File | null = null;
  isAdmin: boolean = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pointsService: StudentPointsService,
    private userService: UserService
  ) {
    this.addPointsForm = this.fb.group({
      points: ['', [Validators.required, Validators.min(1)]],
      file: [null, Validators.required],
    });

    this.isAdmin = this.userService.isAdmin();
    this.userId = this.userService.getIdNumber();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['.xls', '.xlsx'];
      const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

      if (validExtensions.includes(fileExtension)) {
        this.selectedFile = file;
        this.addPointsForm.patchValue({ file: this.selectedFile });
      } else {
        alert('ניתן להעלות רק קבצי Excel עם סיומת .xls או .xlsx');
        this.selectedFile = null;
        this.addPointsForm.patchValue({ file: null });
        event.target.value = ''; // איפוס הקובץ שנבחר
      }
    }
  }

  onSubmit(): void {
    if (this.addPointsForm.invalid || !this.selectedFile) {
      alert('נא למלא את כל השדות ולהעלות קובץ תקין');
      return;
    }

    const points = this.addPointsForm.get('points')?.value;

   // if (this.isAdmin) {
      // העלאת הקובץ ועדכון הנקודות
      this.pointsService.uploadExcelWithPoints(this.selectedFile, points).subscribe(
        (response) => {
          alert('הקובץ הועלה והנקודות עודכנו בהצלחה!');
          console.log('Success:', response);
        },
        (error) => {
          alert('אירעה שגיאה בעת העלאת הקובץ.');
          console.error('Error:', error);
        }
      );
   // } else {
   //   alert('משתמשים רגילים לא יכולים לעדכן נתונים.');
   // }
  }
}
