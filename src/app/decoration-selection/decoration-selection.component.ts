import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service'; // ייבוא ה-UserService
import { environment } from '../../environments/environment'; // ייבוא משתנה הסביבה
import { MatDialog } from '@angular/material/dialog';  // ייבוא MatDialog
import { ConfirmVoteDialogComponent } from '../confirm-vote-dialog/confirm-vote-dialog.component';  // ייבוא דיאלוג האישור
import { MatSnackBar } from '@angular/material/snack-bar'; // ייבוא MatSnackBar

@Component({
  selector: 'app-decoration-selection',
  templateUrl: './decoration-selection.component.html',
  styleUrls: ['./decoration-selection.component.scss']
})
export class DecorationSelectionComponent implements OnInit {
  decorations: any[] = [];
  hasVoted = false;  // דגל שמציין אם המשתמש הצביע כבר

  constructor(
    private http: HttpClient,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar // הוספת MatSnackBar להודעות משתמש
  ) {}

  ngOnInit() {
    this.loadDecorations();
    this.checkIfVoted();
  }

  loadDecorations() {
    const apiUrl = environment.apiUrl;
    this.http.get(`${apiUrl}/decorations`).subscribe((response: any) => {
      this.decorations = response;
    });
  }

  // פונקציה לבדוק אם המשתמש כבר הצביע
  checkIfVoted() {
    const userIdNumber = this.userService.getIdNumber();  // קבלת ה-id_number של המשתמש המחובר
    const apiUrl = environment.apiUrl;
    
    // שליחה של בקשה לשרת כדי לבדוק אם המשתמש הצביע
    this.http.get(`${apiUrl}/check_if_voted/${userIdNumber}`).subscribe((response: any) => {
      if (response.hasVoted) {
        this.hasVoted = true;  // עדכון המצב שהמשתמש כבר הצביע
      }
    });
  }

  // פונקציה שמבצעת את חלון האישור לפני שמבצע את ההצבעה
  selectDecoration(decoration: any) {
    if (this.hasVoted) return;  // אם המשתמש כבר הצביע, לא ניתן לבחור שוב

    // פתיחת דיאלוג האישור
    const dialogRef = this.dialog.open(ConfirmVoteDialogComponent, {
      data: {
        decorationName: decoration.class_name // שליחת שם הקישוט (כיתה) לחלון האישור
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userIdNumber = this.userService.getIdNumber(); // קבלת ה-id_number של המשתמש המחובר
        const requestData = {
          decoration_id: decoration.id,
          id_number: userIdNumber
        };

        const apiUrl = environment.apiUrl;
        this.http.post(`${apiUrl}/select_decoration`, requestData)
          .subscribe({
            next: (response: any) => {
              if (response.success) {
                this.hasVoted = true;  // עדכון המצב ל"משתמש הצביע"
                this.snackBar.open('הקישוט נבחר בהצלחה!', 'סגור', { 
                  duration: 10000,
                  panelClass: ['custom-snackbar']  // הוספת מחלקת ה-CSS המותאמת אישית
                });
                              } else {
                this.snackBar.open('שגיאה בבחירת הקישוט', 'סגור', { duration: 50000 });
              }
            },
            error: (err) => {
              console.error('Error occurred:', err);  // הדפסת השגיאה בקונסול
              if (err.status === 403) {
                // במקרה של שגיאת 403 (אסור להצביע על קישוט של כיתתו)
                this.snackBar.open('לא ניתן להצביע עבור קישוט השייך לכיתתך', 'סגור', {
                  duration: 50000,  // הזמן שההודעה תישאר על המסך (במילישניות)
                  panelClass: ['custom-snackbar']  // מחלקת CSS מותאמת אישית
                });
              } else if (err.status === 500) {
                // במקרה של שגיאת שרת
                this.snackBar.open('שגיאה בשרת, נסה שוב מאוחר יותר', 'סגור', { duration: 2000 });
              } else {
                // טיפול בשגיאות אחרות
                this.snackBar.open('הקישוט נבחר בהצלחה!', 'סגור', {duration: 5000});
              }
            }
          });
      } else {
        console.log('ההצבעה בוטלה');
      }
    });
  }
}
