import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @Input() username: string = '';
  @Input() userHandle: string = '';
  @Input() avatarUrl: string = 'icons/no-photo.webp';
}
