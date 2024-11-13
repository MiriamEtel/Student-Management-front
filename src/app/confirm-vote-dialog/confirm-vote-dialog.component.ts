import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // ייבוא ה-MAT_DIALOG_DATA
import { MatDialog } from '@angular/material/dialog';  // ייבוא MatDialog

@Component({
  selector: 'app-confirm-vote-dialog',
  templateUrl: './confirm-vote-dialog.component.html',
  styleUrls: ['./confirm-vote-dialog.component.scss']
})
export class ConfirmVoteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmVoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // קבלת נתוני הדיאלוג (שם הקישוט)
  ) {}

  // פונקציה לסגור את הדיאלוג אם המשתמש בחר לא להצביע
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  // פונקציה לסגור את הדיאלוג אם המשתמש בחר להצביע
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
