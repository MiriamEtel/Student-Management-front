// app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';  // ייבוא UserService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  onLoginStatusChange(status: boolean) {
    this.isLoggedIn = status;
  }

  // פונקציה להתנתקות
  logout(): void {
    this.isLoggedIn = false;  // שינוי סטטוס ההתחברות ל-לא מחובר
    this.userService.clearUserData(); // איפוס הנתונים של המשתמש
    this.router.navigate(['/']);   // ניווט לדף הלוגין
  }
}
