import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DecorationSelectionComponent } from './decoration-selection/decoration-selection.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UploadDecorationComponent } from './upload-decoration/upload-decoration.component';
import { ResultsComponent } from './results/results.component';
import { NgChartsModule } from 'ng2-charts';
import { ConfirmVoteDialogComponent } from './confirm-vote-dialog/confirm-vote-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';  // ייבוא עבור Dialog
import { MatButtonModule } from '@angular/material/button'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DecorationSelectionComponent,
    AddStudentComponent,
    UploadDecorationComponent,
    ResultsComponent,
    ConfirmVoteDialogComponent, 
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },  // מסך כניסה
      { path: 'decoration-selection', component: DecorationSelectionComponent },  // בחירת קישוט לתלמיד
      { path: 'add-student', component: AddStudentComponent },  // הוספת תלמיד
      { path: 'upload-decoration', component: UploadDecorationComponent },  // העלאת קישוט
      { path: 'results', component: ResultsComponent }  // צפייה בתוצאות
    ]),
    FormsModule ,
    HttpClientModule,
    NgChartsModule,
    MatDialogModule,  // הוספת המודול פה
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
