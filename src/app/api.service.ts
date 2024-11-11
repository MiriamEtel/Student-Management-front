import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../src/environments/environment'; // ייבוא משתנה הסביבה

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;  // עדכון הכתובת בהתאם למשתנה apiUrl בסביבה

  constructor(private http: HttpClient) { }

  login(id_number: string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { id_number, name });
  }

  getDecorations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/decorations`);
  }

  vote(decoration_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote`, { decoration_id });
  }
}
