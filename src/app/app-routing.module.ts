import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DecorationSelectionComponent } from './decoration-selection/decoration-selection.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UploadDecorationComponent } from './upload-decoration/upload-decoration.component';
import { ResultsComponent } from './results/results.component';
import { StudentPointsComponent } from './student-points/student-points.component';  
import { ClassPointsComponent } from './class-points/class-points.component';  
import { AddPointsComponent } from './add-points/add-points.component';
import { RegisterComponent } from './register/register.component';
import { NewOptionsComponent } from './new-options/new-options.component';
import { SurveyCreatorComponent } from './survey-creator/survey-creator.component';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { AdminContributionSearchComponent } from './admin-contribution-search/admin-contribution-search.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'decoration-selection', component: DecorationSelectionComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'upload-decoration', component: UploadDecorationComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'student-points', component: StudentPointsComponent },
  { path: 'class-points', component: ClassPointsComponent },  
  { path: 'add-points', component: AddPointsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-options', component: NewOptionsComponent },
  { path: 'survey-creator', component: SurveyCreatorComponent },
  { path: 'virtual-keyboard', component: VirtualKeyboardComponent },
  { path: 'admin-contribution-Search', component: AdminContributionSearchComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
