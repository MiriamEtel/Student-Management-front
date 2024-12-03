import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';  // ייבוא UserService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false; // משתנה לבדיקת אם המשתמש הוא מנהל
  isStudent: boolean = false;
  greetingMessage: string = '';
  userName: string | null = null;// משתנה לשם המשתמש

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const idNumber = this.userService.getIdNumber();
    if (idNumber) {
      this.isLoggedIn = true;
      this.checkUserRole(); // בדיקת תפקיד המשתמש
      this.setGreeting();  // הצגת ברכה עם שם המשתמש
    }
  }

  onLoginStatusChange(status: boolean) {
    this.isLoggedIn = status;
    if (status) {
      this.checkUserRole(); // בדיקת תפקיד המשתמש לאחר התחברות
      this.setGreeting();  // הצגת ברכה עם שם המשתמש
    }
  }

  checkUserRole() {
    const role = this.userService.getRole();
    console.log('Role:', role); // הדפסת התפקיד
    this.isAdmin = role === 'admin';
    this.isStudent = role === 'student'; // בדיקה אם התפקיד הוא תלמיד
  }
  // פונקציה לחישוב הברכה בהתבסס על השעה
  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greetingMessage = 'בוקר טוב';
    } else if (hour < 18) {
      this.greetingMessage = 'צהריים טובים';
    } else {
      this.greetingMessage = 'ערב טוב';
    }

    // כאן אנחנו מניחים שהשם נשמר ב-userService לאחר ההתחברות
    this.userName = this.userService.getUserName(); // קבלת שם המשתמש מהשירות
  
  }

  // פונקציה להתנתקות
  logout(): void {
    this.isLoggedIn = false;  // שינוי סטטוס ההתחברות ל-לא מחובר
    this.isAdmin = false; // איפוס תפקיד המשתמש
    this.userService.clearUserData(); // איפוס הנתונים של המשתמש
    this.router.navigate(['/']);   // ניווט לדף הלוגין
  }
}
