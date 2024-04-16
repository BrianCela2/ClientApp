// reservate.component.ts
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { StepTwoComponent } from '../reservationSteps/step-two/step-two.component';
import { StepThreeComponent } from '../reservationSteps/step-three/step-three.component';
import { StepOneComponent } from '../reservationSteps/step-one/step-one.component';
import { StepFourComponent } from '../reservationSteps/step-four/step-four.component';

@Component({
  selector: 'app-reservate',
  templateUrl: './reservate.component.html',
  styleUrls: ['./reservate.component.css'],
  imports: [
    CommonModule,
    StepperComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent
  ],
  standalone: true,
})
export class ReservateComponent {
  stepIndex = 0;
  isCompleted : boolean = false;
  @ViewChild(StepOneComponent) stepOneComponent!: StepOneComponent;
  @ViewChild(StepTwoComponent) stepTwoComponent!: StepTwoComponent;
  @ViewChild(StepThreeComponent) stepThreeComponent!: StepThreeComponent;

  onStepChanged(index: number) {
    this.stepIndex = index;
  } 
  
  onStepNext() {
    if (this.stepIndex === 2 && this.stepTwoComponent) {
      this.stepTwoComponent.createReservation();
    }
    if (this.stepIndex === 3 && this.stepThreeComponent) {
      this.stepThreeComponent.addServicesToReservation();
    }
  }
  
}
