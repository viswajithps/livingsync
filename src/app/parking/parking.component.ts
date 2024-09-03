import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ParkingService } from '../parking.service';

interface Slot {
  id: number;
  date:string;
  booked: boolean;
  guestName?: string; // Add optional guest name
}

interface DSlot{
  slotNumber: number;
  date:string;
  guestName?: string;
}

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})
export class ParkingComponent {
  title="Parking Booking"
  slots: Slot[] = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    date: '',
    booked: false,
  }));
  selectedSlot: Slot | null = null;
  guestName: string = '';
  showBookingModal: boolean = false;
  filteredSlots: Slot[] = [];
  selectedDate: string = '';
  dSlot:DSlot[]=[];

  ngOnInit(): void {
    this.initializeSlots(); // Initialize slots with default values
  }

  constructor(private parkingService :ParkingService){}

  initializeSlots(): void {
    // Simulate initial slot data
    this.slots = Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      date: '',
      booked: false,
    }));
    this.filteredSlots = this.slots; // Initially show all slots
  }

  selectSlot(slot: Slot): void {
    if (!slot.booked) {
      this.selectedSlot = slot;
    }
  }

  openBookingModal(): void {
    if (this.selectedSlot) {
      this.showBookingModal = true;
    }
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    this.guestName = ''; // Clear guest name input
  }

  bookSlot(): void {
    if (this.guestName.trim() && this.selectedSlot) {
      this.selectedSlot.booked = true;
      this.selectedSlot.guestName = this.guestName.trim();
      this.selectedSlot.date = this.selectedDate;
      this.parkingService.bookSlot(this.selectedSlot.id,this.selectedSlot.guestName,this.selectedSlot.date).subscribe(
       {
        next : (data) => {console.log(data);},
        error: (error) => {console.log(error);}
       } 
      );
      // Simulate saving the booking
      // console.log(`Slot ID: ${this.selectedSlot.id} booked successfully.`);
      //this.updateSlotColors();
      this.selectedSlot = null; // Deselect the slot after booking
      this.closeBookingModal();
    } else {
      alert('Guest name is required.');
    }
  }

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDate = inputElement.value;
    this.updateSlotColors();
    console.log('Selected Date:', this.selectedDate);
    // console.log(this.slots);
  }

  updateSlotColors(): void {
    // Update slot colors based on the selected date
    this.parkingService.getSlots(this.selectedDate).subscribe({
      next: (data) => {
          console.log(data); // Log the raw data received

          // Update the filteredSlots based on the received data
          this.filteredSlots.forEach(slot => {
              // Check if the slot is booked for the selected date
              const isBooked = data.some((dbSlot: any) => dbSlot.slotNumber === slot.id && dbSlot.date === this.selectedDate);
              // Update the slot's booked status and color
              slot.booked = isBooked;

              // Set slot color based on the booked status
              // if (isBooked) {
              //     slot.color = 'red'; // Change to your desired color for booked slots
              // } else {
              //     slot.color = 'green'; // Change to your desired color for available slots
              // }
          });

          // console.log(this.filteredSlots); // Log the updated slots with colors
      },
      error: (err) => {
          console.error('Error fetching slot data:', err); // Log any error that occurs
      }
  });}
}
