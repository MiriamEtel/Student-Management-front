import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; 
import { environment } from '../../environments/environment'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  id_number: string = '';
  nickname: string = '';
  donationField: string = '';
  phone: string = '';
  className: string = ''; 
  isRegister: boolean = false; 
  @Output() loginStatus = new EventEmitter<boolean>(); 
  showAlert: boolean = false;
  alertMessage: string = '';
  isKeyboardVisible = false;
  activeField: string = '';
  showForm: boolean = false;
  selectedFields: string[] = ['', ''];
  classes: string[] = []; // רשימת הכיתות

  donationFields = ['דרמה', 'מחול', 'מחזמר', 'שירה', 'נגינה', 'אמנות', 'טכני'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService 
  ) {this.loadClasses();}

    // פונקציה לטעינת הכיתות מהשרת
    loadClasses() {
      const apiUrl = environment.apiUrl;
      this.http.get(`${apiUrl}/get_class_list`).subscribe((response: any) => {
        this.classes = response.classes; // משתמש במפתח 'classes' שמוחזר מהשרת
      }, (error) => {
        console.error('Error loading classes:', error);
      });
    }    

  showCustomAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }

  closeAlert() {
    this.showAlert = false;
  }

  sanitizeInput(input: string): string {
    return input
      .normalize('NFKC') // מנרמל את הטקסט לפורמט אחיד
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // מסיר תווים בלתי נראים כמו ZERO WIDTH
      .trim(); // מסיר רווחים מיותרים
  }

  login() {
    this.id_number = this.sanitizeInput(this.id_number);
  
    if (!this.id_number) {
      this.showCustomAlert('יש להזין תעודת זהות');
      return;
    }
  
    const loginData = { id_number: this.id_number };
    const apiUrl = environment.apiUrl;
  
    this.http.post(`${apiUrl}/login`, loginData)
      .subscribe((response: any) => {
        console.log('Login response:', response);
        if (response.success) {
          this.userService.setIdNumber(response.id_number);
          this.userService.setRole(response.role);
          this.userService.setUserClass(response.class_name);
          this.userService.setUserName(response.name);
          this.userService.setNickname(response.nickname);
          this.loginStatus.emit(true);
          if (response.role === 'admin') {
            this.router.navigate(['/add-points']); // למנהלים
          } else {
            this.router.navigate(['/new-options']); // לשאר המשתמשים
          }
        } else {
          this.showCustomAlert('תעודת זהות שגויה');
        }
      }, (error) => {
        console.error('Login error:', error);
        if (error.status === 403) {
          this.showCustomAlert('עלייך להשלים את ההרשמה למערכת');
        } else if (error.status === 404) {
          this.showCustomAlert('מספר זהות לא נכון או לא קיים במערכת');
        } else {
          this.showCustomAlert('שגיאה בהתחברות');
        }
      });
  }
  

  register() {
    this.id_number = this.sanitizeInput(this.id_number);
    this.nickname = this.sanitizeInput(this.nickname);
    this.donationField = this.sanitizeInput(this.donationField);
    this.phone = this.sanitizeInput(this.phone);
    this.className = this.sanitizeInput(this.className);
  
    if (!this.id_number || !this.className || !this.nickname) {
      this.showCustomAlert('יש למלא את כל השדות הנדרשים');
      return;
    }
  
    const registerData = {
      id_number: this.id_number,
      nickname: this.nickname,
      donationFields: this.selectedFields.join(','),
      phone: this.phone,
      className: this.className
    };
    const apiUrl = environment.apiUrl;
  
    this.http.post(`${apiUrl}/register`, registerData)
      .subscribe((response: any) => {
        if (response.success) {
          this.showCustomAlert('הרשמה בוצעה בהצלחה');
          this.toggleRegister(); 
        } else {
          this.showCustomAlert(response.error || 'שגיאה בהרשמה');
        }
      }, (error) => {
        console.error('Registration error:', error);
        const errorMessage = error.error?.error || 'שגיאה בהרשמה. נסו שנית מאוחר יותר';
        this.showCustomAlert(errorMessage);
      });
  }

  toggleRegister(): void {
    this.isRegister = !this.isRegister;
  }

  showKeyboard(field: string) {
    this.activeField = field;  // עדכון השדה הפעיל
    this.isKeyboardVisible = true;
  }
  focusField(field: string) {
  this.activeField = field;  // עדכון השדה הפעיל
  this.isKeyboardVisible = false;  // מסתיר את המקלדת לפני שמציגים אותה שוב
  setTimeout(() => {
    this.isKeyboardVisible = true;  // מציג את המקלדת מחדש אחרי שמוקם המיקוד
  }, 100);
}


  onInputChanged(event: { field: string, value: string }) {
    if (event.field === this.activeField) {
      if (this.activeField === 'username') {
        this.username = event.value;
      } else if (this.activeField === 'id_number') {
        this.id_number = event.value;
      } else if (this.activeField === 'nickname') {
        this.nickname = event.value;
      }
      else if (this.activeField === 'className') {
        this.className = event.value;
      }else if (this.activeField === 'phone') {
        this.phone = event.value;
      }
    }
  }
  // פונקציה לפתיחת הטופס
openForm(isRegister: boolean): void {
  this.isRegister = isRegister;
  this.showForm = true;
}

// פונקציה לסגירת הטופס
closeForm(): void {
  this.showForm = false;
}
}
