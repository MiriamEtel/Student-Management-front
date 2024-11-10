import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    this.http.post('http://127.0.0.1:5000/add_student', studentData)
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
