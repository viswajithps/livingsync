import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CalendarComponent } from '../calendar/calendar.component';
import { Event } from '../Event';
import { EventsService } from '../events.service';


interface User {
  id: string;
  name: string;
}

interface Ev{
  id:number;
  name:string;
  date:string;
  description:string;
}

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CalendarComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {
  event:Event=new Event();
  events:Ev[]=[];
  @Output() eventPosted = new EventEmitter<Event>();

  users: User[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' }
  ];

  // Flags to control form visibility
  showPaymentForm = false;
  showEventForm = false;
  showEventList = false;

  // Form groups
  paymentForm: FormGroup;
  eventForm: FormGroup;

  // events: Event[] = [
  //   // Array of events
  //   { name: "Task 6", dueDate: "2024-09-10",  description: "In Progress" }
  // ];

  constructor(private fb: FormBuilder, private eventService:EventsService) {
    // Initialize payment form with validators
    this.paymentForm = this.fb.group({
      user: [null, Validators.required],
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
    this.showEventList=false;
  }

  // Show event form
  displayEventForm() {
    this.showPaymentForm = false;
    this.showEventForm = true;
    this.showEventList=false;
  }

  displayEventList() {
    this.showPaymentForm = false;
    this.showEventForm = false;
    this.showEventList=true;
    this.loadEvents();
  }

  // Handle payment form submission
  submitPayment() {
    if (this.paymentForm.valid) {
      const { user,amount, description } = this.paymentForm.value;
      console.log(`Payment Request - Amount: ${amount}, Description: ${description},Name:${user.name},ID:${user.id}`);
      // this.resetForms();
      this.paymentForm.reset();
    }
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },
      error: (error) => console.error('Error loading events:', error)
    });
  }

  // Handle event form submission
  submitEvent() {
    if (this.eventForm.valid) {

      // const newEvent: Event = {
      //   name: this.eventForm.value.eventName,
      //   dueDate: this.eventForm.value.eventDate,
      //   description: this.eventForm.value.eventDescription
      // };
      // this.events.push(newEvent);
      // this.eventPosted.emit(newEvent); // Emit event to parent
      // this.resetForms();
      const { eventName, eventDate, eventDescription } = this.eventForm.value;
      console.log(this.event);
      this.eventService.createEvent(this.event).subscribe((data)=>{
        console.log(data)
      })
      alert("Event Added Successfuly!!");
      // this.resetForms();
      this.eventForm.reset();
    }
  }

  deleteEvent(eventId: number): any {
    console.log(eventId);
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvents(eventId).subscribe({
        next: (data) => {
          this.loadEvents();
          alert("Event Deleted Successfully");
           // Refresh the event list after deleting an event
        },
        error: (error) => console.error('Error deleting event:', error)
      });
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
