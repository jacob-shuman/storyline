import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { ProjectService } from 'src/app/services/project/project.service';
import { EventService, SLEvent } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.css']
})
export class TimelineCardComponent {
  @Input() event: SLEvent;
  constructor(private router: Router, private projectService: ProjectService, private eventService: EventService) { }

  async editEvent() {
    this.router.navigate(
      ['project', this.projectService.currentProject.id, 'timeline', this.event.id],
      { state: { event: this.event } }
    );
  }

  async deleteEvent() {
    const result = await Swal.fire({
      ...TOAST.CONFIRM_DELETE,
      confirmButtonText: 'Delete'
    });

    if (result.value) {
      try {
        await this.eventService.deleteEvent(this.event);
        await Swal.fire(TOAST.EVENT_DELETED);
      } catch (error) {
        Swal.fire({ ...TOAST.FAIL, title: `There was an error deleting "${this.event.name}"`, text: error });
      }

      await this.eventService.getEvents(this.projectService.currentProject.id, true);
      await this.router.navigate(['project', this.projectService.currentProject.id, 'events']);
    }
  }
}
