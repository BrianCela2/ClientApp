import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from '../../../notifications/notification-list/notification-list.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink,CommonModule,NotificationListComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); 
  }
  isAdmin():boolean{
    return this.authService.isAdmin()
  }
  isAdminOperator():boolean{
    return this.authService.isAdminOperator()
  }
}
