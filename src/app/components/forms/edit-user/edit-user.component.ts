import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  constructor(private user: UserService, private fb: FormBuilder,private _toasterService: PopupService) {}
  UpdateForm!: FormGroup;

  ngOnInit(): void {
    this.UpdateForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: [''],
      Birthday: [''],
      Country: [''],
      City: [''],
    });
  }

  onUpdate() {
    console.log(this.UpdateForm.value);
    this.user.updateUser(this.UpdateForm.value).subscribe({
      next: (res) => {
        this.UpdateForm.reset();
        this._toasterService.success('User updated successfully');
      },
      error: (err) => {
        console.log(err);
        this._toasterService.danger('Error updating user');
      },
    });
  }
}
