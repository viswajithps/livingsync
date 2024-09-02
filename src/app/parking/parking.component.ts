import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface Slot {
  id: number;
  reserved: boolean;
  booked: boolean;
  guestName?: string; // Add optional guest name
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
    reserved: false,
    booked: false,
  }));

  selectedSlot: Slot | null = null;
  guestName: string = '';
  showBookingModal: boolean = false;

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
      console.log(`Slot ID: ${this.selectedSlot.id}, Guest Name: ${this.selectedSlot.guestName}`);
      this.selectedSlot = null; // Deselect the slot after booking
      this.closeBookingModal();
      
    } else {
      alert('Guest name is required.');
    }
  }
}
