import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_ENDPOINT } from 'src/app/constants';

import { AuthService } from '../auth/auth.service';

export interface SLEvent {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  date: string;
  elements: string[];
}

export interface SLMongoEvent {
  _id: string;
  name: string;
  description: string;
  projectId: string;
  date: string;
  elements: string[];
}

export interface SLCreateEventResult {
  success: boolean;
  error?: any;
}

export interface SLGetEventByIdResult {
  success: boolean;
  error?: any;
}

export interface SLUpdateEventResult {
  success: boolean;
  event: SLMongoEvent;
  error?: any;
}

export interface SLGetAllEventsResult {
  events: SLMongoEvent[];
  success: boolean;
  error?: any;
}

export interface SLDeleteEventResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  projectId: string;
  events: SLEvent[];
  currentEvent?: SLEvent;

  constructor(private authService: AuthService, private http: HttpClient) { }

  /**
   * @param event A event directly from mongo
   *
   * @returns The same event in a cleaner/consistent format
   */
  private parseMongoEvent(event: SLMongoEvent): SLEvent {
    return {
      id: event._id,
      name: event.name,
      description: event.description,
      projectId: event.projectId,
      date: event.date,
      elements: event.elements
    } as SLEvent;
  }

  /**
   * @param projectId The project to create the event on
   * @param event The event details
   *
   * @returns Whether event creation was successful
   */
  async createEvent(event: SLEvent): Promise<SLCreateEventResult> {
    try {
      if (!event.projectId) {
        throw Error('"projectId" missing on event');
      }

      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { event };
      const url = `${API_ENDPOINT}/project/${event.projectId}/events/create`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLCreateEventResult;

      if (!result.success || result.error) {
        throw Error(result.error);
      }

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getEventById(projectId: string, eventId: string): Promise<SLEvent> {
    if (!this.events || this.events.length < 1) {
      await this.getEvents(projectId);
    }

    const event = this.events.find(char => char.id === eventId);

    if (!event) {
      throw Error(`No event with ID of ${eventId}`);
    }

    return event;
  }

  async getEvents(projectId: string, forceUpdate: boolean = false): Promise<SLEvent[]> {
    if (!this.events || (this.events && this.projectId !== projectId) || forceUpdate) {
      try {
        const params = { password: this.authService.user.password };
        const url = `${API_ENDPOINT}/project/${projectId}/events`;
        const result = await this.http.get(url, { params }).toPromise() as SLGetAllEventsResult;

        this.events = result.events.map(this.parseMongoEvent);
        this.projectId = projectId;
      } catch (err) {
        throw err;
      }
    }

    return this.events;
  }

  async updateEvent(event: SLEvent): Promise<SLUpdateEventResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { event };
      const url = `${API_ENDPOINT}/project/${event.projectId}/events/update`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLUpdateEventResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  async deleteEvent(event: SLEvent): Promise<SLDeleteEventResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { event };
      const url = `${API_ENDPOINT}/project/${event.projectId}/events/delete`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLDeleteEventResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  clearEvents(): void {
    this.projectId = undefined;
    this.events = undefined;
    this.currentEvent = undefined;
  }

  getAllDates(): Date[] {
    // All Dates
    const allDates = this.events.map((event) => event.date);

    return allDates.reduce((dates: Date[], dateString: string) => {
      const date = new Date(dateString);

      return !dates.find((curr) => curr.getFullYear() === date.getFullYear() && curr.getMonth() === date.getMonth()) ? dates.concat(new Date(date.getFullYear(), date.getMonth())) : dates;
    }, []).sort((x, y) => x.getTime() - y.getTime());
  }
}
