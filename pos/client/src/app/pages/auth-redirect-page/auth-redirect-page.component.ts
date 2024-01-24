import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api/auth-api.service';

@Component({
  selector: 'app-auth-redirect-page',
  templateUrl: './auth-redirect-page.component.html',
  styleUrl: './auth-redirect-page.component.css'
})
export class AuthRedirectPageComponent implements OnInit {

  constructor (private route: ActivatedRoute, private auth: AuthApiService, private router: Router) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.auth.authenticate(code).subscribe({
        next: () => this.router.navigateByUrl('/tables'),
        error: () => window.location.href = 'https://getbento.vercel.app/login'
      })
    } else window.location.href = 'https://getbento.vercel.app/login';
  }

}
