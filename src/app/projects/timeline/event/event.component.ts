import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import Swal from 'ngx-angular8-sweetalert2';

import { SLEvent, EventService, SLUpdateEventResult } from 'src/app/services/event/event.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TOAST } from 'src/app/constants';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  loadingEvent = true;
  event: SLEvent;
  date: Date | string;

  constructor(public router: Router, public projectService: ProjectService, public eventService: EventService) { }

  async ngOnInit() {
    await this.loadProject();

    try {
      await this.eventService.getEvents(this.projectService.currentProject.id);
      this.eventService.currentEvent = await this.eventService.getEventById(
        this.projectService.currentProject.id,
        this.router.parseUrl(this.router.url).root.children.primary.segments[3].path
      );

      this.event = { ...this.eventService.currentEvent };
      this.date = moment(new Date(this.event.date)).format('YYYY-MM-DD');
    } catch (err) {
      this.router.navigate(['projects', this.projectService.currentProject.id, 'events']);
    }

    this.loadingEvent = false;
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path;

      try {
        this.projectService.currentProject = await this.projectService.getProjectById(projectId);
      } catch (err) {
        this.router.navigate(['projects']);
      }
    }
  }

  public validateFields(): boolean {
    if (!this.event.name || this.event.name.trim() === '') {
      return false;
    }

    if (!this.event.description || this.event.description.trim() === '') {
      return false;
    }

    if (!this.date) {
      return false;
    }

    if (
      (this.event.name === this.eventService.currentEvent.name) &&
      (this.event.description === this.eventService.currentEvent.description) &&
      (new Date(this.date.toString()).getDay() + 1 === new Date(this.event.date).getDay()) &&
      (new Date(this.date.toString()).getMonth() === new Date(this.event.date).getMonth()) &&
      (new Date(this.date.toString()).getFullYear() === new Date(this.event.date).getFullYear())
    ) {
      return false;
    }

    return true;
  }

  public async updateEvent(): Promise<void> {
    this.loadingEvent = true;
    this.event.date = new Date(moment(this.date).toString()).toString();

    // this.event.date = new Date(this.date).toString();

    try {
      const result: SLUpdateEventResult = await this.eventService.updateEvent(this.event);

      if (result.success) {
        await this.eventService.getEvents(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.event.projectId, 'timeline']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)"> "${this.event.name}" was updated successfully!</span` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error updating "${this.event.name}"</span>`, text: error });
    }

    this.loadingEvent = false;
  }
}
