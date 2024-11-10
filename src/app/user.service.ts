// src/app/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private idNumber: string | null = null;

  // פונקציה לשמירת ה-ID
  setIdNumber(idNumber: string) {
    this.idNumber = idNumber;
    localStorage.setItem('id_number', idNumber); // שמירת ה-id ב-Local Storage כדי לשמור על המידע גם אחרי רענון
  }

  // פונקציה לשליפת ה-ID
  getIdNumber(): string | null {
    return this.idNumber || localStorage.getItem('id_number');
  }

  // פונקציה למחיקת ה-ID (לשימוש בזמן התנתקות)
  clearIdNumber() {
    this.idNumber = null;
    localStorage.removeItem('id_number');
  }
}
