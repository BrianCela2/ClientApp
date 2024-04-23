import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class StepperComponent {
  @Input() steps: string[] = [];
  @Input() isCompleted!:boolean;
  @Output() stepChanged = new EventEmitter<number>();
  currentStepIndex = 0;
  @Output() nextButtonClicked = new EventEmitter();

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.stepChanged.emit(this.currentStepIndex);
      this.nextButtonClicked.emit();
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.stepChanged.emit(this.currentStepIndex);
    }
  }
}
