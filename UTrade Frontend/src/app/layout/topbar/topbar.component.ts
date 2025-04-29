import { Component, HostListener } from '@angular/core';

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

  menuVisible: boolean = false;

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.menuVisible && event.target instanceof Element && !event.target.closest('.d-flex')) {
      this.menuVisible = false;
    }
  }

  editProfile() {
    console.log('Editar perfil');
  }

  changePassword() {
    console.log('Cambiar contraseña');
  }

  toggleTheme() {
    console.log('Alternar tema');
  }

  logout() {
    console.log('Cerrar sesión');
  }

}
