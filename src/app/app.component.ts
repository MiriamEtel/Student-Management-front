import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isStudent: boolean = false;
  greetingMessage: string = '';
  userName: string | null = null;
  selectedComponentImage: string = '/assets/images/new-bg.png'; // תמונה ברירת מחדל
  componentTitle :string =''
  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const idNumber = this.userService.getIdNumber();
    if (idNumber) {
      this.isLoggedIn = true;
      this.checkUserRole();
      this.setGreeting();
    }
    
    // עדכון התמונה בהתאם לנתיב הנוכחי
    this.router.events.subscribe(() => {
      this.updateComponentImage();
    });
  }

  onLoginStatusChange(status: boolean) {
    this.isLoggedIn = status;
    if (status) {
      this.checkUserRole();
      this.setGreeting();
    }
  }

  checkUserRole() {
    const role = this.userService.getRole();
    console.log('Role:', role);
    this.isAdmin = role === 'admin';
    this.isStudent = role === 'student';
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      this.greetingMessage = 'בוקר טוב';
    } else if (hour >= 12 && hour < 18){
      this.greetingMessage = 'צהריים טובים';
    } else {
      this.greetingMessage = 'ערב טוב';
    }

    this.userName = this.userService.getUserName();
  }

  updateComponentImage() {
    const currentRoute = this.router.url;

    // קביעת התמונה לפי הנתיב הנוכחי
    if (currentRoute.includes('new-options')) {
      this.selectedComponentImage = '/assets/images/new-bg.png';
      this.componentTitle = '? מה חדש';
    } else if (currentRoute.includes('class-points')) {
      this.selectedComponentImage = '/assets/images/class-bg.png';
      this.componentTitle = 'אזור כיתתי';
    } else if (currentRoute.includes('student-points')) {
      this.selectedComponentImage = '/assets/images/personal-bg.png';
      this.componentTitle = 'אזור אישי';
    } else {
      this.selectedComponentImage = '/assets/images/new-bg.png';
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.userService.clearUserData();
    this.router.navigate(['/']);
  }
}
