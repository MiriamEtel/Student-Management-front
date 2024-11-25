import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // ייבוא ה-UserService
import { environment } from '../../environments/environment'; // ייבוא משתנה הסביבה

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  id_number: string = '';
  @Output() loginStatus = new EventEmitter<boolean>(); // מגדיר את EventEmitter
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService // הזרקת UserService
  ) {}

  showCustomAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }

  closeAlert() {
    this.showAlert = false;
  }

  login() {
    const loginData = { username: this.username, id_number: this.id_number };

    // שימוש במשתנה apiUrl
    const apiUrl = environment.apiUrl;

    this.http.post(`${apiUrl}/login`, loginData)
    .subscribe((response: any) => {
      console.log('Login response:', response);
      if (response.success) {
        this.userService.setIdNumber(this.id_number); // שמירת ה-id ב-UserService
        this.userService.setRole(response.role); // שמירת התפקיד ב-UserService
        this.userService.setUserClass(response.class_name); // שמירת שם הכיתה
        this.loginStatus.emit(true); // שדר את הסטטוס של התחברות מוצלחת
        this.router.navigate(['/decoration-selection']);
      } else {
        this.showCustomAlert('שם משתמש או תעודת זהות שגויים');
      }
    }, (error) => {
      console.error('Login error:', error);
      this.showCustomAlert('שם משתמש או תעודת זהות שגויים');
    });
  }
}
