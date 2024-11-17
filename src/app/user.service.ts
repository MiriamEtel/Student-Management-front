import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private idNumber: string | null = null;
  private userClass: string | null = null; // הוספת שדה לשמירת הכיתה
  private role: string | null = null; // שדה לשמירת תפקיד המשתמש

  // פונקציה לשמירת ה-ID
  setIdNumber(idNumber: string) {
    this.idNumber = idNumber;
    localStorage.setItem('id_number', idNumber); // שמירת ה-id ב-Local Storage
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

  // פונקציה לשמירת התפקיד של המשתמש
  setRole(role: string) {
    this.role = role;
    localStorage.setItem('user_role', role); // שמירת התפקיד ב-Local Storage
  }

  // פונקציה לשליפת התפקיד של המשתמש
  getRole(): string {
    // אם התפקיד לא נמצא בשירות, נשלוף אותו מ-LocalStorage, אחרת ברירת מחדל תהיה "student"
    return this.role || localStorage.getItem('user_role') || 'student'; // ברירת מחדל "student"
  }

  // פונקציה לבדיקת אם המשתמש הוא מנהל
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  // פונקציה למחיקת כל הנתונים של המשתמש (לשימוש בזמן התנתקות)
  clearUserData() {
    this.idNumber = null;
    this.userClass = null;
    this.role = null;
    localStorage.removeItem('id_number');
    localStorage.removeItem('user_class');
    localStorage.removeItem('user_role');
  }
}
