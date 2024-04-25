import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserHistoryService } from '../../../services/user-history.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent {
public userHistory:any=[];

constructor(public userHistoryService:UserHistoryService){}
ngOnInit(){
  this.getHistory();
}
getHistory(){
  this.userHistoryService.getHistory().subscribe(result=>{
    this.userHistory=result;
  });
}
}
