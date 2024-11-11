import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service'; // ייבוא ה-UserService
import { environment } from '../../environments/environment'; // ייבוא משתנה הסביבה

@Component({
  selector: 'app-decoration-selection',
  templateUrl: './decoration-selection.component.html',
  styleUrls: ['./decoration-selection.component.scss']
})
export class DecorationSelectionComponent implements OnInit {
  decorations: any[] = [];
  hasVoted = false;  // דגל שמציין אם המשתמש הצביע כבר

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.loadDecorations();
  }

  loadDecorations() {
    // שימוש במשתנה apiUrl
    const apiUrl = environment.apiUrl;
    this.http.get(`${apiUrl}/decorations`).subscribe((response: any) => {
      this.decorations = response;
    });
  }

  selectDecoration(decoration: any) {
    if (this.hasVoted) return;  // אם המשתמש כבר הצביע, לא ניתן לבחור שוב

    const userIdNumber = this.userService.getIdNumber(); // קבלת ה-id_number של המשתמש המחובר
    const requestData = {
      decoration_id: decoration.id,
      id_number: userIdNumber
    };

    // שימוש במשתנה apiUrl
    const apiUrl = environment.apiUrl;
    this.http.post(`${apiUrl}/select_decoration`, requestData)
      .subscribe((response: any) => {
        if (response.success) {
          this.hasVoted = true;  // עדכון המצב ל"משתמש הצביע"
          alert('הקישוט נבחר בהצלחה!');
        } else {
          alert('שגיאה בבחירת הקישוט');
        }
      });
  }
}
