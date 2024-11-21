import { Component, OnInit } from '@angular/core';
import { StudentPointsService } from '../student-points.service';
import { UserService } from '../user.service'; // יבוא השירות שלך

@Component({
  selector: 'app-student-points',
  templateUrl: './student-points.component.html',
  styleUrls: ['./student-points.component.scss'],
})
export class StudentPointsComponent implements OnInit {
  totalPoints: number = 0; // סך כל הנקודות
  goldPointsArray: number[] = []; // נקודות זהב
  silverPointsArray: number[] = []; // נקודות כסף
  bonusMessage: string | null = null;

  constructor(
    private studentPointsService: StudentPointsService,
    private userService: UserService // הזרקת השירות שלך
  ) {}

  ngOnInit(): void {
    const studentId = this.userService.getIdNumber(); // שליפת המזהה משירות המשתמש
    if (studentId) {
      this.fetchStudentPoints(studentId); // שליפת הנקודות לפי מזהה התלמיד
    } else {
      console.error('Student ID not found');
    }
  }

  fetchStudentPoints(studentId: string): void {
    this.studentPointsService.getStudentPoints(studentId).subscribe(
      (data) => {
        this.totalPoints = data.points; // עדכון הנקודות מהשרת
        this.calculatePoints();
        this.generateEncouragementMessage();
      },
      (error) => {
        console.error('Error fetching student points:', error);
      }
    );
  }

  calculatePoints(): void {
    const goldPoints = Math.floor(this.totalPoints / 10); // חלוקה לנקודות זהב
    const silverPoints = this.totalPoints % 10; // חלוקה לנקודות כסף

    this.goldPointsArray = Array(goldPoints).fill(0); // יצירת מערך של נקודות זהב
    this.silverPointsArray = Array(silverPoints).fill(0); // יצירת מערך של נקודות כסף
  }

  generateEncouragementMessage(): void {
    if (this.totalPoints > 0 && this.totalPoints % 5 === 0) {
      this.bonusMessage = `מזל טוב! צברת ${this.totalPoints} נקודות 🎉`;
    } else {
      this.bonusMessage = null;
    }
  }
}
