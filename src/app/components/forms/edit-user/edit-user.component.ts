import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PopupService } from '../../../services/popup.service';
import { User } from '../../../shared/user.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  constructor(
    private user: UserService,
    private fb: FormBuilder,
    private _toasterService: PopupService,
    private router: Router
  ) {}
  UpdateForm!: FormGroup;
  public actualUser!: User;

  ngOnInit(): void {
    this.fetchuser();
  }

  fetchuser() {
    this.user.getActualUserById().subscribe({
      next: (res) => {
        this.actualUser = res;
        console.log(res);

        this.UpdateForm = this.fb.group({
          FirstName: [this.actualUser.firstName, Validators.required],
          LastName: [this.actualUser.lastName, Validators.required],
          Email: [
            this.actualUser.email,
            [Validators.required, Validators.email],
          ],
          PhoneNumber: [this.actualUser.phoneNumber],
          Birthday: [this.actualUser.birthday],
          Country: [this.actualUser.country],
          City: [this.actualUser.city],
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  onUpdate() {
    console.log(this.UpdateForm.value);
    this.user.updateUser(this.UpdateForm.value).subscribe({
      next: (res) => {
        this.UpdateForm.reset();
        this._toasterService.success('User updated successfully');
        this.fetchuser();
      },
      error: (err) => {
        console.log(err);
        this._toasterService.danger('Error updating user');
      },
    });
  }
}
