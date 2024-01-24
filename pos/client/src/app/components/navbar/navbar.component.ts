import { Component, Input } from '@angular/core';
import { IUser } from '../../models/user.model';
// import { RouterLink } from '@angular/router';
// import { NzButtonComponent } from 'ng-zorro-antd/button';
// import { NzTypographyModule } from 'ng-zorro-antd/typography';


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
