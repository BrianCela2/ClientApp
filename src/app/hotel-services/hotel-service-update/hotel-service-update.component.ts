import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';

@Component({
  selector: 'app-hotel-service-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-service-update.component.html',
  styleUrls: ['./hotel-service-update.component.css']
})
export class HotelServiceUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  serviceId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private hotelServiceService: HotelServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve service ID from route parameters
    this.serviceId = this.route.snapshot.paramMap.get('id')!;

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
    this.hotelServiceService.getHotelServiceById(this.serviceId).subscribe(
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
      // Update service with form data
      this.hotelServiceService.updateHotelService(this.serviceId, this.updateForm.value).subscribe(
        () => {
          // Navigate back to hotel services list after successful update
          this.router.navigate(['/hotel-services']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
