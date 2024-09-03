import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './Event';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }

  createEvent(event:Event):Observable<Event>{
    let url = "http://localhost:8083/events"
    return this.http.post<Event>(url,event)
  }

  getEvents():Observable<any>{
    let url = "http://localhost:8083/events"
    return this.http.get<any>(url)
  }

  deleteEvents(id:number):Observable<any>{
    let url = "http://localhost:8083/events"
    return this.http.delete<any>(`${url}/${id}`);
  }
}
