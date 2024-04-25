import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-service-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hotel-service-update.component.html',
  styleUrls: ['./hotel-service-update.component.css']
})
export class HotelServiceUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  serviceID!: string;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private hotelServiceService: HotelServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve service ID from route parameters
    this.serviceID = this.route.snapshot.paramMap.get('id')!;

    // Initialize form with validators
    this.updateForm = this.formBuilder.group({
      serviceName: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      category: [''],
      openTime: ['']
    });

    // Load service details
    this.loadService();
  }

  // Function to load service details
  loadService(): void {
    this.hotelServiceService.getHotelServiceById(this.serviceID).subscribe(
      (data: any) => {
        // Populate form with service details
        this.updateForm.patchValue(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.updateForm.valid) {
      this.submitted = true; // Set submitted to true
      // Update service with form data
      this.hotelServiceService.updateHotelService(this.serviceID, this.updateForm.value).subscribe(
        () => {
          // Navigate back to hotel services list after successful update
          this.router.navigate(['https://localhost:7006/api/hotel-services/all']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
