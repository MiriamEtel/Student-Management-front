import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-class-points',
  templateUrl: './class-points.component.html',
  styleUrls: ['./class-points.component.scss']
})
export class ClassPointsComponent {
  @Input() classPoints: number = 0;  // שים לב שהמשתנה נקרא classPoints כאן
  @Input() milestones: any[] = [];
  @Input() projects: any[] = [];
  feedbackMessage: string = '';

  ngOnInit() {
    this.setMilestoneFeedback();
  }

  setMilestoneFeedback() {
    if (this.classPoints >= 50) {
      this.feedbackMessage = "הכיתה הגיעה ל-50 נקודות, והם קיבלו נקודת זהב!";
    } else {
      this.feedbackMessage = "הכיתה צריכה לצבור עוד נקודות!";
    }
  }
}
