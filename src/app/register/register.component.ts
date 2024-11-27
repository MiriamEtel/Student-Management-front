import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({});
  classes: string[] = []; // רשימת הכיתות
  activityFields: string[] = []; // רשימת תחומי תרומה
  errorMessage: string = ''; // הודעת שגיאה

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // אתחול רשימת הכיתות ותחומי התרומה
    this.classes = ['יא/1', 'יא/2', 'יב/1', 'יב/2']; // דוגמה
    this.activityFields = ['מדעים', 'ספורט', 'מוזיקה', 'אחר'];

    // אתחול טופס ההרשמה
    this.registerForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // ת.ז עם בדיוק 9 ספרות
      nickname: ['', [Validators.required, Validators.minLength(2)]],
      className: ['', Validators.required],
      activityField: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // מספר טלפון בן 10 ספרות
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'נא למלא את כל השדות בצורה תקינה.';
      return;
    }

    const formData = this.registerForm.value;

    this.http.post('/api/register', formData).subscribe(
      (response) => {
        alert('הרשמה הושלמה בהצלחה!');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error.message || 'אירעה שגיאה בהתחברות.';
      }
    );
  }
}
