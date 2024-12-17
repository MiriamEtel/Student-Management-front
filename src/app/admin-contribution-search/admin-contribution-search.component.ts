import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-contribution-search',
  templateUrl: './admin-contribution-search.component.html',
  styleUrls: ['./admin-contribution-search.component.scss']
})
export class AdminContributionSearchComponent {
  selectedField: string = ''; // התחום שנבחר
  selectedClass: string = ''; // הכיתה שנבחרה
  students: any[] = []; // רשימת התלמידות
  searched: boolean = false; // האם בוצע חיפוש
  currentPage: number = 1; // עמוד נוכחי לפג'ינציה
  totalPages: number = 0; // סך כל העמודים
  contributionFields = ['דרמה', 'מחול', 'מחזמר', 'שירה', 'נגינה', 'אמנות', 'טכני'];
  classList: string[] = []; 

  constructor(private http: HttpClient) {
    this.loadClassList();
  }
  
  // שליפת רשימת כיתות מהשרת
  loadClassList() {
    const apiUrl = environment.apiUrl;
    this.http.get(`${apiUrl}/get_class_list`)
      .subscribe((response: any) => {
        this.classList = response.classes;
      }, (error) => {
        console.error('Error fetching class list:', error);
      });
  }
  // חיפוש תלמידות לפי תחום וכיתה
  searchStudents(page: number = 1) {
    if (!this.selectedField) {
      alert('אנא בחר תחום לחיפוש');
      return;
    }

    const apiUrl = `${environment.apiUrl}/search_students_by_field`;
    const params = new HttpParams()
      .set('field', this.selectedField)
      .set('className', this.selectedClass)
      .set('page', page.toString()); // עמוד לפג'ינציה

    this.http.get(apiUrl, { params }).subscribe(
      (response: any) => {
        this.students = response.students.map((student: any) => {
          const fields = student.contribution_area.split(',');
          return {
            name: student.name,
            className: student.class_name,
            contribution_area: this.selectedField,
            position: fields[0] === this.selectedField ? 'מקום ראשון' : 'מקום שני'
          };
        });
        this.currentPage = page;
        this.totalPages = response.totalPages; // מספר עמודים סה"כ
        this.searched = true;
      },
      (error) => {
        console.error('Error fetching students:', error);
        this.searched = true;
      }
    );
  }

  // מעבר לעמוד הבא
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.searchStudents(this.currentPage + 1);
    }
  }

  // חזרה לעמוד קודם
  prevPage() {
    if (this.currentPage > 1) {
      this.searchStudents(this.currentPage - 1);
    }
  }
}
