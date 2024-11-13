// src/app/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private idNumber: string | null = null;
  private userClass: string | null = null; // הוספת שדה לשמירת הכיתה

  // פונקציה לשמירת ה-ID
  setIdNumber(idNumber: string) {
    this.idNumber = idNumber;
    localStorage.setItem('id_number', idNumber); // שמירת ה-id ב-Local Storage כדי לשמור על המידע גם אחרי רענון
  }

  // פונקציה לשליפת ה-ID
  getIdNumber(): string | null {
    return this.idNumber || localStorage.getItem('id_number');
  }

  // פונקציה לשמירת שם הכיתה של המשתמש
  setUserClass(userClass: string) {
    this.userClass = userClass;
    localStorage.setItem('user_class', userClass); // שמירת הכיתה ב-Local Storage
  }

  // פונקציה לשליפת שם הכיתה
  getUserClass(): string | null {
    return this.userClass || localStorage.getItem('user_class');
  }

  // פונקציה למחיקת ה-ID והכיתה (לשימוש בזמן התנתקות)
  clearUserData() {
    this.idNumber = null;
    this.userClass = null;
    localStorage.removeItem('id_number');
    localStorage.removeItem('user_class');
  }
}
