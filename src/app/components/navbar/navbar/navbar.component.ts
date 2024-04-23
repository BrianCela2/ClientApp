import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
  toggleDropdown(event: Event) {
    event.preventDefault();
  }
}
