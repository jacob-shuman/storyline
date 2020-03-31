import { Component, OnInit} from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { EventService, Event } from '../services/event/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent implements OnInit {

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 2200;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1
  range = 1;

  event: Event;

  constructor(public eventService: EventService, private router: Router) { }

  async ngOnInit() {
    try {
      await this.eventService.getEvents();
    } catch (err) {
      console.error(err);
    }

    this.eventService.currentEvent.subscribe(event => this.event = event);
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  onInputChange(event: MatSliderChange) {
    this.value = event.value;
  }

  onEventClick(event) {
    this.eventService.changeEvent(event);
  }

}