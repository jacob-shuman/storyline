import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

export interface Event {
  id: String;
  name: String;
  timeIndex: number;
  description: String;
  project_ID: String;
}

export interface MongoEvent {
  _id: String;
  Name: String;
  Time_Index: number;
  Description: String;
  Project_ID: String;
}

export interface GetAllEventsResult {
  events: MongoEvent[];
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Event[];
  allEvents: Event[];
  private eventSource = new BehaviorSubject<Event>({
    id: "0",
    name: "0",
    timeIndex: 0,
    description: "0",
    project_ID: "0"
   });
  currentEvent = this.eventSource.asObservable();
  

  constructor(private http: HttpClient) { }

  private parseMongoEvents(events: MongoEvent[]): Event[] {
    
    return events.map((event) => {
      return {
        id: event._id,
        name: event.Name,
        timeIndex: event.Time_Index,
        description: event.Description,
        project_ID: event.Project_ID
      } as Event;
    });

  }

  async getEvents(forceUpdate: boolean = false): Promise<Event[]> {
    if (!this.events || forceUpdate) {
      try {
        const result: GetAllEventsResult = await this.http.get(`http://localhost:10040/api/events`).toPromise() as GetAllEventsResult;
    
        this.events = this.parseMongoEvents(result.events);

        return this.events

      } catch (err) {
        throw err;
      }
    }

    return this.events;
  }

  async changeEvent(event: Event) {
    this.eventSource.next(event);
  }
  
}
