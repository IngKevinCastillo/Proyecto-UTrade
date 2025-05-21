import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css']
})
export class NotificationIconComponent {
  @Input() notificationCount: number = 0;
}
