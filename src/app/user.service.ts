import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private idNumber: string | null = null;
  private userClass: string | null = null;
  private role: string | null = null;
  private userName: string | null = null; // שמירה על השם המלא
  private nickname: string | null = null; // שמירה על שם החיבה

  // פונקציה לשמירת שם המשתמש המלא
  setUserName(username: string) {
    this.userName = username;
    localStorage.setItem('user_name', username); // שמירת שם המשתמש ב-LocalStorage
  }

  // פונקציה לשמירת שם החיבה
  setNickname(nickname: string) {
    this.nickname = nickname;
    localStorage.setItem('nickname', nickname); // שמירת שם החיבה ב-LocalStorage
  }

  // פונקציה לשליפת שם המשתמש
  getUserName(): string | null {
    return this.userName || localStorage.getItem('user_name');
  }

  // פונקציה לשליפת שם החיבה
  getNickname(): string | null {
    return this.nickname || localStorage.getItem('nickname');
  }

  // פונקציה לשמירת ה-ID
  setIdNumber(idNumber: string) {
    this.idNumber = idNumber;
    localStorage.setItem('id_number', idNumber);
  }

  // פונקציה לשליפת ה-ID
  getIdNumber(): string | null {
    return this.idNumber || localStorage.getItem('id_number');
  }

  // פונקציה לשמירת שם הכיתה של המשתמש
  setUserClass(userClass: string) {
    this.userClass = userClass;
    localStorage.setItem('user_class', userClass);
  }

  // פונקציה לשליפת שם הכיתה
  getUserClass(): string | null {
    return this.userClass || localStorage.getItem('user_class');
  }

  // פונקציה לשמירת התפקיד של המשתמש
  setRole(role: string) {
    this.role = role;
    localStorage.setItem('user_role', role);
  }

  // פונקציה לשליפת התפקיד של המשתמש
  getRole(): string {
    return this.role || localStorage.getItem('user_role') || 'student';
  }

  // פונקציה לבדיקת אם המשתמש הוא מנהל
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  // פונקציה למחיקת כל הנתונים של המשתמש
  clearUserData() {
    this.idNumber = null;
    this.userClass = null;
    this.role = null;
    this.userName = null;
    this.nickname = null; // מחיקת שם החיבה
    localStorage.removeItem('id_number');
    localStorage.removeItem('user_class');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('nickname'); // מחיקת שם החיבה מ-LocalStorage
  }
}
