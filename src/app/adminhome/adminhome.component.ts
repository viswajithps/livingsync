import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {

  // Flags to control form visibility
  showPaymentForm = false;
  showEventForm = false;

  // Form groups
  paymentForm: FormGroup;
  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize payment form with validators
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });

    // Initialize event form with validators
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventDescription: ['', Validators.required]
    });
  }

  // Show payment form
  displayPaymentForm() {
    this.showPaymentForm = true;
    this.showEventForm = false;
  }

  // Show event form
  displayEventForm() {
    this.showPaymentForm = false;
    this.showEventForm = true;
  }

  // Handle payment form submission
  submitPayment() {
    if (this.paymentForm.valid) {
      const { amount, description } = this.paymentForm.value;
      console.log(`Payment Request - Amount: $${amount}, Description: ${description}`);
      this.resetForms();
    }
  }

  // Handle event form submission
  submitEvent() {
    if (this.eventForm.valid) {
      const { eventName, eventDate, eventDescription } = this.eventForm.value;
      console.log(`Event Posted - Name: ${eventName}, Date: ${eventDate}, Description: ${eventDescription}`);
      this.resetForms();
    }
  }

  // Reset forms and hide them
  resetForms() {
    this.showPaymentForm = false;
    this.showEventForm = false;
    this.paymentForm.reset();
    this.eventForm.reset();
  }
}
