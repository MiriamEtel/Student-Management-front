import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // ייבוא משתנה הסביבה

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  studentName: string = '';
  idNumber: string = '';

  constructor(private http: HttpClient) {}

  addStudent() {
    const studentData = { name: this.studentName, id_number: this.idNumber };

    // שימוש ב-API URL מהסביבה
    const apiUrl = environment.apiUrl;  // משתנה סביבה שונה בין סביבה מקומית לענן

    this.http.post(`${apiUrl}/add_student`, studentData)  // משתמשים ב-API URL המתאים
      .subscribe((response: any) => {
        if (response.message) {
          alert(response.message);
          this.studentName = '';
          this.idNumber = '';
        } else {
          alert('שגיאה בהוספת תלמיד');
        }
      });
  }
}
