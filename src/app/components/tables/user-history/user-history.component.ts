import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserHistoryService } from '../../../services/user-history.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../tablePagination/pagination/pagination.component';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule,PaginationComponent],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent {
public userHistory:any=[];
public totalPages!:number ;
public currentPage: number = 1;
public pageSize: number = 10;

constructor(public userHistoryService:UserHistoryService){}
ngOnInit(){
  this.getHistory();
}
getHistory(){
  this.userHistoryService.getHistory(this.currentPage, this.pageSize).subscribe(res=>{
    console.log('res',res)
    this.userHistory = res.userHistory;
    this.totalPages =res.totalPages;
  });
}
onPageChange(page: number) {
  this.currentPage = page;
  this.getHistory();
}
}
