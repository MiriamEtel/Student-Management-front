import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service'; // ייבוא ה-UserService

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
    this.http.get('http://127.0.0.1:5000/decorations').subscribe((response: any) => {
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

    this.http.post('http://127.0.0.1:5000/select_decoration', requestData)
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
