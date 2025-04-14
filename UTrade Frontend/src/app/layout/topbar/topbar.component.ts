import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  activeFilter: string = 'todo';

  username: string = 'Juan mrd';
  userHandle: string = '@vendogalletas';
  avatarUrl: string = 'icons/oceana.png';

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
}
