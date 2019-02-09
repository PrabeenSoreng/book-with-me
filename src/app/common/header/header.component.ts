import { Component, OnInit, DoCheck, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated: boolean;

  constructor(
    public authService: AuthService,
    private router: Router) {
    //this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
