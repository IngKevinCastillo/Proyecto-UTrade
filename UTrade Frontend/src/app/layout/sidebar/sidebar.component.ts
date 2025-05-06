import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
      if (event.constructor.name === 'NavigationEnd') {
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
    }
  }

  setActive(route: string) {
    this.activeBtn = route;
    this.router.navigate(['/' + route]);
  }

}