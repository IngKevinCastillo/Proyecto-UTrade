import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeBtn: string = 'home'; 

  setActive(btn: string) {
    this.activeBtn = btn;
  }
}
