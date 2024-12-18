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
  nickname: string | null = null;

  constructor(
    private studentPointsService: StudentPointsService,
    private userService: UserService // הזרקת השירות שלך
  ) {}

  ngOnInit(): void {
    this.nickname = this.userService.getNickname(); // עדכון המאפיין המחלקתי
    console.log(this.nickname); // הדפסה לאימות
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
    if (this.totalPoints > 0) {
      if (this.totalPoints <= 10) {
        this.bonusMessage = "! כל הכבוד";
      } else if (this.totalPoints > 10 && this.totalPoints <= 20) {
        this.bonusMessage = "! לכי גבוה יש לך למה";
      } else if (this.totalPoints > 20 && this.totalPoints <= 30) {
        this.bonusMessage = "! טוב יותר ועוד יותר , ועוד";
      } else {
        this.bonusMessage = "! לכי גבוה יש לך למה";
      }
    } else {
      this.bonusMessage = null;
    }
  }
  
}
