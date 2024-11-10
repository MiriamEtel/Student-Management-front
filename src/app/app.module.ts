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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DecorationSelectionComponent,
    AddStudentComponent,
    UploadDecorationComponent,
    ResultsComponent, 
    
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
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
