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

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    const idNumber = this.userService.getIdNumber();
    if (idNumber) {
      this.isLoggedIn = true;
      this.checkUserRole(); // בדיקת תפקיד המשתמש
    }
  }

  onLoginStatusChange(status: boolean) {
    this.isLoggedIn = status;
    if (status) {
      this.checkUserRole(); // בדיקת תפקיד המשתמש לאחר התחברות
    }
  }

  checkUserRole() {
    console.log('Role:', this.userService.getRole());  // הדפסת התפקיד
    this.isAdmin = this.userService.isAdmin();
  }
  // פונקציה להתנתקות
  logout(): void {
    this.isLoggedIn = false;  // שינוי סטטוס ההתחברות ל-לא מחובר
    this.isAdmin = false; // איפוס תפקיד המשתמש
    this.userService.clearUserData(); // איפוס הנתונים של המשתמש
    this.router.navigate(['/']);   // ניווט לדף הלוגין
  }
}
