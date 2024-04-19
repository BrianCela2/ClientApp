import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { CommonModule } from '@angular/common';
import { CreateHotelServiceDTO } from '../../shared/hotel-services.model';


@Component({
  selector: 'app-hotel-service-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    RouterModule],
  templateUrl: './hotel-service-create.component.html',
  styleUrls: ['./hotel-service-create.component.css']
})

export class HotelServiceCreateComponent implements OnInit {
  createForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private hotelServiceService: HotelServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize the form with FormBuilder
    this.createForm = this.formBuilder.group({
      ServiceName: ['', Validators.required],
      Description: [''],
      Price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      Category: [''],
      OpenTime: ['']
    });
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.createForm.valid) {
      // If the form is valid, call the service to add the hotel service
      this.hotelServiceService.addHotelService(this.createForm.value).subscribe(
        () => {
          // If successful, navigate to the hotel services page
          this.router.navigate(['/hotel-services']);
        },
        (error: any) => {
          // If an error occurs, log it to the console
          console.log(error);
        }
      );
    }
  }
}

