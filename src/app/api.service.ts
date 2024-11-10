import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:5000';  // כתובת השרת המקומי

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
