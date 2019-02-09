import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegister(data: NgForm) {
    this.authService.register(data.value)
      .subscribe(() => {
        this.router.navigate(['/login', {registered: 'success'}]);
      }, err => this.errors = err.error.errors);
  }
}
