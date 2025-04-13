import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  activeFilter: string = 'todo';

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
}
