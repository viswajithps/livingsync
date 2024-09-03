// slot.model.ts
export interface Slot {
    slotNumber: number;
    date:string;
   // booked: boolean;
    guestName?: string; // Optional property if it's not always present
  }