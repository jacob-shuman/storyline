import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService, SLObject } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {
  objects: SLObject[];
  loadingObjects = true;

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

    this.loadingObjects = false;
  }

}
