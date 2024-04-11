import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private role = new BehaviorSubject<any>("");

  constructor() { }
  public getRole(){
    console.log(this.role)
    return this.role.asObservable();
  }
  public setRole(role:any){
   this.role.next(role);
  }
}
