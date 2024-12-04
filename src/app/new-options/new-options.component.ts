import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-options',
  templateUrl: './new-options.component.html',
  styleUrls: ['./new-options.component.scss']
})
export class NewOptionsComponent {
  constructor(private router: Router) {}

  // פונקציה לניווט לבחירת קישוט
  navigateToDecorationSelection() {
    this.router.navigate(['/decoration-selection']);
  }

  // פונקציה לניווט לצפיה בתוצאות
  navigateToResults() {
    this.router.navigate(['/results']);
  }
}
