import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLEvent, SLCreateEventResult, EventService } from 'src/app/services/event/event.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  loadingProject = true;
  loadingEvent = false;
  event: SLEvent;
  date: Date;

  constructor(private router: Router, public projectService: ProjectService, public eventService: EventService) { }

  ngOnInit() {
    this.loadProject();
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

    this.event = {
      id: '',
      name: '',
      description: '',
      projectId: this.projectService.currentProject.id,
      date: new Date(Date.now()).toString(),
      elements: []
    };

    this.loadingProject = false;
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
    } else {
      this.event.date = this.date.toString();
    }

    return true;
  }

  public async createEvent(): Promise<void> {
    this.loadingEvent = true;

    try {
      const result: SLCreateEventResult = await this.eventService.createEvent(this.event);

      if (result.success) {
        await this.eventService.getEvents(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.event.projectId, 'timeline']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)">"${this.event.name}" was created successfully!</span>` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error creating "${this.event.name}"</span>`, text: error });
    }

    this.loadingEvent = true;
  }
}
