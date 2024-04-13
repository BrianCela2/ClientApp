import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { UserRoleService } from '../../../services/user-role.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users:any = [];
  public role!:string;

  public fullName : string = "";
  constructor(private user : UserService, private auth: AuthService, private userRole:UserRoleService) { }

  ngOnInit() {
    this.user.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

    this.userRole.getRole()
    .subscribe(val=>{
      console.log(val)
      const roleFromToken = this.auth.getRoleFromToken();
      console.log(roleFromToken)
      this.role = val || roleFromToken;
    })
  }

  logout(){
    this.auth.signOut();
  }

}