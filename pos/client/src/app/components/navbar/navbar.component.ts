import { Component, Input } from '@angular/core';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() user : IUser | undefined;

  logout () {
    localStorage.removeItem('accessToken');
    window.location.href = 'https://getbento.vercel.app/logout';
  }
}
