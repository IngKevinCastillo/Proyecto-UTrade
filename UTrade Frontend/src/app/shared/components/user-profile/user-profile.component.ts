import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @Input() username: string = 'Usuario';
  @Input() userHandle: string = '@usuario';
  @Input() avatarUrl: string = 'assets/default-avatar.png';
}
