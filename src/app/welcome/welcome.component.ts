import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  assets = {
    backgroundImage: '/assets/images/welcome-bg.png',
    iconPrimary: '/assets/icons/welcome-primary.svg',
    iconSecondary: '/assets/icons/welcome-secondary.svg'
  };

  config = {
    headingText: 'שמרנו לך',
    highlightText: 'מקום של כבוד!',
    subheadingText: 'היכנסי, אנחנו מחכות לך!',
    loginButtonText: 'כניסה',
    registerButtonText: 'רישום'
  };
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.preloadImages();
  }

  private preloadImages(): void {
    Object.values(this.assets).forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  onLogin(): void {
    console.log('Login clicked');  }

  onRegister(): void {
    console.log('Register clicked');
  }
}