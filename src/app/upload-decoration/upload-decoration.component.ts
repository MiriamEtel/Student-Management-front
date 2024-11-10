import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-decoration',  
  templateUrl: './upload-decoration.component.html',
  styleUrls: ['./upload-decoration.component.scss']
})
export class UploadDecorationComponent {
  selectedFile: File | null = null;
  imageName: string = '';
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient) { }

  // פונקציה כאשר קובץ נבחר
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // הצגת תצוגה מקדימה של התמונה
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // פונקציה להעלאת התמונה
  uploadImage() {
    if (!this.selectedFile) {
      console.log('לא נבחרה תמונה להעלאה.');
      return;
    }
  
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    uploadData.append('name', this.imageName);  // מחליף את 'name' ב-'class_name' אם זה מה שמצפה השרת
  
    // קריאה ל-API של השרת ב-Node.js
    this.http.post<any>('http://localhost:5000/add-decoration', uploadData).subscribe(
      (res) => {
        console.log(res);
        alert(`התמונה של ${this.imageName} הועלתה בהצלחה!`);
      },
      (err) => {
        console.error('שגיאה בעת העלאת התמונה:', err);
        alert('הייתה שגיאה בהעלאת התמונה');
      }
    );
  }
  
}
