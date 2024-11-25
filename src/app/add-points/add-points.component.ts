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
  operationType: string = ''; // סוג הפעולה שנבחרה
  isAdmin: boolean = false;

  // טפסים נפרדים
  individualForm: FormGroup; // טופס עבור תלמידה בודדת
  classForm: FormGroup; // טופס עבור כיתה
  groupForm: FormGroup; // טופס עבור קבוצת תלמידות עם קובץ

  selectedFile: File | null = null; // קובץ שהועלה

  constructor(
    private fb: FormBuilder,
    private pointsService: StudentPointsService,
    private userService: UserService
  ) {
    // אתחול הטפסים
    this.individualForm = this.fb.group({
      studentId: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(1)]],
    });

    this.classForm = this.fb.group({
      className: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(1)]],
    });

    this.groupForm = this.fb.group({
      points: ['', [Validators.required, Validators.min(1)]],
      file: [null, Validators.required],
    });

    // בדיקת האם המשתמש הוא אדמין
    this.isAdmin = this.userService.isAdmin();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['.xls', '.xlsx'];
      const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

      if (validExtensions.includes(fileExtension)) {
        this.selectedFile = file;
        this.groupForm.patchValue({ file: this.selectedFile });
      } else {
        alert('ניתן להעלות רק קבצי Excel עם סיומת .xls או .xlsx');
        this.selectedFile = null;
        this.groupForm.patchValue({ file: null });
        event.target.value = ''; // איפוס הקובץ שנבחר
      }
    }
  }

  onSubmitIndividual(): void {
    if (this.individualForm.invalid) {
      alert('נא למלא את כל השדות הנדרשים.');
      return;
    }

    const { studentId, points } = this.individualForm.value;
    this.pointsService.updateStudentPoints(studentId, points).subscribe(
      (response) => {
        alert('נקודות נוספו לתלמידה בהצלחה!');
      },
      (error) => {
        alert('אירעה שגיאה בעדכון הנקודות.');
        console.error(error);
      }
    );
  }

  onSubmitClass(): void {
    if (this.classForm.invalid) {
      alert('נא למלא את כל השדות הנדרשים.');
      return;
    }

    const { className, points } = this.classForm.value;
    this.pointsService.updateClassPoints(className, points).subscribe(
      (response) => {
        alert('נקודות נוספו לכיתה בהצלחה!');
      },
      (error) => {
        alert('אירעה שגיאה בעדכון הנקודות.');
        console.error(error);
      }
    );
  }

  // פונקציה להוספת נקודות לכל תלמיד בכיתה
  onSubmitAddPointsToClass(): void {
    if (this.classForm.invalid) {
      alert('נא למלא את כל השדות הנדרשים.');
      return;
    }

    const { className, points } = this.classForm.value;
    this.pointsService.addPointsToClass(className, points).subscribe(
      (response) => {
        alert('נקודות נוספו לכל תלמידי הכיתה בהצלחה!');
      },
      (error) => {
        alert('אירעה שגיאה בהוספת הנקודות לתלמידים.');
        console.error(error);
      }
    );
  }
  
  onSubmitGroup(): void {
    if (this.groupForm.invalid || !this.selectedFile) {
      alert('נא למלא את כל השדות הנדרשים ולהעלות קובץ.');
      return;
    }

    const points = this.groupForm.get('points')?.value;
    this.pointsService.uploadExcelWithPoints(this.selectedFile, points).subscribe(
      (response) => {
        alert('הקובץ הועלה בהצלחה!');
      },
      (error) => {
        alert('אירעה שגיאה בהעלאת הקובץ.');
        console.error(error);
      }
    );
  }
}
