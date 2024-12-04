import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 

import { MatTooltipModule } from '@angular/material/tooltip';  // הוספת המודול
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
import { MatSnackBarModule } from '@angular/material/snack-bar';  // ייבוא של מודול MatSnackBar
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentPointsComponent } from './student-points/student-points.component';
import { ClassPointsComponent } from './class-points/class-points.component';
import { MatIconModule } from '@angular/material/icon';
import { AddPointsComponent } from './add-points/add-points.component'; // ייבוא מודול MatIcon
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './register/register.component';
import { NewOptionsComponent } from './new-options/new-options.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DecorationSelectionComponent,
    AddStudentComponent,
    UploadDecorationComponent,
    ResultsComponent,
    ConfirmVoteDialogComponent,
    StudentPointsComponent,
    ClassPointsComponent,
    AddPointsComponent,
    RegisterComponent,
    NewOptionsComponent, 
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },  // מסך כניסה
      { path: 'decoration-selection', component: DecorationSelectionComponent },  // בחירת קישוט לתלמיד
      { path: 'add-student', component: AddStudentComponent },  // הוספת תלמיד
      { path: 'upload-decoration', component: UploadDecorationComponent },  // העלאת קישוט
      { path: 'results', component: ResultsComponent } , // צפייה בתוצאות
      { path: 'student-points', component: StudentPointsComponent }, // נקודות תלמיד
      { path: 'class-points', component: ClassPointsComponent }, // נקודות כיתה
      { path: 'add-points', component: AddPointsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'new-options', component: NewOptionsComponent },


    ]),
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    MatDialogModule,  // הוספת המודול פה
    MatButtonModule,
    MatSnackBarModule, 
    BrowserAnimationsModule,  // הוספת מודול אנימציות
    MatTooltipModule,
    MatIconModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
