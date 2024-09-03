import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Event } from '../Event';
import { EventsService } from '../events.service';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  events:Event[]=[];

  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  calendar: (Date | null)[][] = [];
  selectedTasks: Event[] = [];

  constructor(private eventService:EventsService) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.getAllEvents();
  }

  getAllEvents(){
    this.eventService.getEvents().subscribe((data:Event[])=>{
      this.events=data;
    })
  }
  generateCalendar(): void {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
    let currentWeek: (Date | null)[] = [];
    this.calendar = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      currentWeek.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day));
      
      if (currentWeek.length === 7) {
        this.calendar.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      this.calendar.push(currentWeek);
    }
  }

  selectDate(date: Date | null): void {
    if (date) {
      this.selectedDate = date;
      this.selectedTasks = this.events.filter(event => 
        new Date(event.date).toDateString() === date.toDateString()
      );
    } else {
      this.selectedDate = null;
      this.selectedTasks = [];
    }
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  hasTasks(date: Date | null): boolean {
    if (!date) return false;
    return this.events.some(event => new Date(event.date).toDateString() === date.toDateString());
  }

}
