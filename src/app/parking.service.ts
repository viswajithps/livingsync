import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Slot } from '../slot.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private apiUrl = 'http://localhost:8082/parking-slots';

  constructor(private http: HttpClient) { }

  // Fetch available slots for a given date
  getSlots(date: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.apiUrl}`);
  }

  // Book a slot
  bookSlot(id: number, guestName: string, date: string): Observable<any> {
    // Prepare the complete request body
    const requestBody = {
      slotNumber: id,
      guestName: guestName,
      date: date,
      //booked: true
    };

    return this.http.post<any>(`${this.apiUrl}`, requestBody);
  }
}
