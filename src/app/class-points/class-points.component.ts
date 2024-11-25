import { Component, OnInit } from '@angular/core';
import { StudentPointsService } from '../student-points.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-class-points',
  templateUrl: './class-points.component.html',
  styleUrls: ['./class-points.component.scss'],
})
export class ClassPointsComponent implements OnInit {
  totalClassPoints: number = 0; // סך הנקודות של הכיתה
  goldPointsArray: number[] = []; // מערך נקודות זהב
  silverPointsArray: number[] = []; // מערך נקודות כסף
  bonusMessage: string = ''; // הודעת עידוד
  className: string = ''; // שם הכיתה

  constructor(
    private studentPointsService: StudentPointsService,
    private userService: UserService // שירות המשתמשים
  ) {}

  ngOnInit(): void {
    // קבלת שם הכיתה מהשירות
    this.className = this.userService.getUserClass() || ''; // אם שם הכיתה לא נמצא, יש להחזיר מחרוזת ריקה
    console.log('Class name from UserService:', this.className); // הדפסה לאבחון
    this.fetchClassPoints();
  }

  // שליפת נקודות הכיתה
  fetchClassPoints(): void {
    if (!this.className) {
      console.error('שם הכיתה לא נמצא.');
      return;
    }

    // שליחת בקשה לשירות הנקודות
    this.studentPointsService.getClassPoints(this.className).subscribe(
      (response) => {
        this.totalClassPoints = response.totalPoints;

        // חישוב נקודות זהב וכסף
        const goldPoints = Math.floor(this.totalClassPoints / 10); // כל 10 נקודות = זהב
        const silverPoints = this.totalClassPoints % 10; // השארית = כסף

        this.goldPointsArray = Array(goldPoints).fill(0);
        this.silverPointsArray = Array(silverPoints).fill(0);

        // הודעת עידוד
        this.bonusMessage =
          this.totalClassPoints >= 50
            ? 'כל הכבוד! הכיתה שלכם מתקדמת בצבירה מרשימה!'
            : this.totalClassPoints >= 20
            ? 'מצוין! המשיכו כך!'
            : 'התחלה טובה, בואו נשקיע עוד קצת';
      },
      (error) => {
        console.error('שגיאה בשליפת הנקודות:', error);
      }
    );
  }
}
