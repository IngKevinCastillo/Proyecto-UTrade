import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeBtn: string = 'home'; 

  constructor(private router: Router) {
    this.setActiveFromUrl(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveFromUrl(this.router.url);
      }
    });
  }

  setActiveFromUrl(url: string) {
    if (url.includes('/home')) {
      this.activeBtn = 'home';
    } else if (url.includes('/chat')) {
      this.activeBtn = 'chat';
    } else if (url.includes('/settings')) {
      this.activeBtn = 'settings';
    } else if (url.includes('/soporte')) {
      this.activeBtn = 'soporte';
    } else if (url.includes('/reportes')) {
      this.activeBtn = 'reportes';
    } else {
      this.activeBtn = '';
    }
  }

  setActive(route: string) {
    this.activeBtn = route;
    this.router.navigate(['/' + route]);
  }
}
