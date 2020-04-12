import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, SLEvent } from 'src/app/services/event/event.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  currentEvents: SLEvent[];
  loadingTimeline = false;
  dates: Date[] = [];
  date: Date = new Date(Date.now());

  constructor(private router: Router, public projectService: ProjectService, public eventService: EventService) { }

  async ngOnInit() {
    this.loadingTimeline = true;

    await this.loadProject();

    try {
      await this.eventService.getEvents(this.projectService.currentProject.id);
    } catch (err) {
      console.error(err);
    }

    this.dates = this.eventService.getAllDates();

    if (this.dates.length > 0) {
      this.date = this.dates[0];
    }

    this.regenerateEvents();

    this.loadingTimeline = false;
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1];

      try {
        this.projectService.currentProject = await this.projectService.getProjectById(projectId.path);
      } catch (err) {
        this.router.navigate(['projects']);
      }
    }
  }

  getDateIndex(): number {
    return this.dates.findIndex((date) => date === this.date);
  }

  shiftBackwards(): void {
    if (this.dates) {
      const index = this.dates.findIndex((date) => date === this.date);

      if (index > 0) {
        this.date = this.dates[index - 1];
        this.regenerateEvents();
      }
    }
  }

  shiftForward(): void {
    if (this.dates) {
      const index = this.dates.findIndex((date) => date === this.date);

      if (index < this.dates.length - 1) {
        this.date = this.dates[index + 1];
        this.regenerateEvents();
      }
    }
  }

  regenerateEvents(): void {
    this.currentEvents = this.eventService.events.filter((event) => {
      const date = new Date(event.date);

      return this.date.getFullYear() === date.getFullYear() && this.date.getMonth() === date.getMonth();
    });
  }
}
