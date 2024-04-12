import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import ValidateForm from '../../../helpers/validateForm';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa fa-eye-slash';
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required],
      Password: ['', Validators.required],
      Birthday: ['', Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      //Send object to database
      console.log(this.signUpForm.value);
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          this.signUpForm.reset();
          this.router.navigate(['login'])
          alert(res.message);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
      //throw error using toaster
    }
  }

  showPassword() {
    this.isText = !this.isText;
    this.isText
      ? (this.eyeIcon = 'fa fa-eye')
      : (this.eyeIcon = 'fa fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
