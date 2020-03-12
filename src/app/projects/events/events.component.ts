import { Component, OnInit } from '@angular/core';
import { SLEvent, ProjectService } from 'src/app/services/project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: SLEvent[];
  loadingEvents = true;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.loadProject();
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1];

      try {
        this.projectService.currentProject = await this.projectService.getProjectsById(projectId.path);
      } catch(err) {
        this.router.navigate(['projects']);
      }
    }

    this.loadingEvents = false;
  }

}
