import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../services/event/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.sass']
})
export class EventDetailsComponent implements OnInit {

  event: Event;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.currentEvent.subscribe(event => this.event = event);
  }
}
