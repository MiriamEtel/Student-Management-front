import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // ייבוא משתנה הסביבה

@Injectable({
  providedIn: 'root'
})
export class StudentPointsService {
  private apiUrl = environment.apiUrl;// כתובת ה-API שלך

  constructor(private http: HttpClient) {}

  // פונקציה לשליפת נקודות התלמיד
  getStudentPoints(idNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student-points/${idNumber}`);
  }

  // פונקציה לעדכון נקודות התלמיד
  updateStudentPoints(studentId: string, newPoints: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-student-points/${studentId}`, { newPoints });
  }

     // שליפת נקודות כיתה לפי שם
  getClassPoints(className: string): Observable<any> {
    const encodedClassName = encodeURIComponent(className);
    return this.http.get<any>(`${this.apiUrl}/class-points/${encodedClassName}`);
  }

// פונקציה לעדכון נקודות הכיתה
updateClassPoints(className: string, points: number): Observable<any> {
  const encodedClassName = encodeURIComponent(className);
  return this.http.put<any>(`${this.apiUrl}/update-class-points/${encodedClassName}`, { points });
}

// פונקציה להוספת נקודות לכל תלמיד בכיתה
addPointsToClass(className: string, points: number): Observable<any> {
  const encodedClassName = encodeURIComponent(className);  // קידוד שם הכיתה
  return this.http.put<any>(`${this.apiUrl}/add-points-to-class`, { className: encodedClassName, points });
}

  // פונקציה להעלאת קובץ אקסל עם נקודות
  uploadExcelWithPoints(file: File, points: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('points', points.toString());

    return this.http.post<any>(`${this.apiUrl}/upload-excel`, formData);
  }
}
