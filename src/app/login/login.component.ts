import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // ייבוא ה-UserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  id_number: string = '';
  @Output() loginStatus = new EventEmitter<boolean>(); // מגדיר את EventEmitter

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService // הזרקת UserService
  ) {}

  login() {
    const loginData = { username: this.username, id_number: this.id_number };

    this.http.post('http://127.0.0.1:5000/login', loginData)
    .subscribe((response: any) => {
      console.log('Login response:', response);
      if (response.success) {
        this.userService.setIdNumber(this.id_number); // שמירת ה-id ב-UserService
        this.loginStatus.emit(true); // שדר את הסטטוס של התחברות מוצלחת
        this.router.navigate(['/decoration-selection']);
      } else {
        alert('שם משתמש או תעודת זהות שגויים');
      }
    }, (error) => {
      console.error('Login error:', error);
      alert('שגיאה בשרת או בנתונים');
    });
  }
}
