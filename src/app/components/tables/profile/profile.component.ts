import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  public user!:User
constructor(private userService:UserService,private router:Router){}
ngOnInit(): void {
  this.userService.getActualUserById().subscribe({
    next: (res) => {
      console.log('user',this.user)
      this.user=res;
    },
    error: (error) => {
      console.error('There was an error!', error);
    },
  });
}
navigateTo(){
this.router.navigateByUrl("/updateUser")
}
}
