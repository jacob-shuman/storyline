import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from 'src/app/services/project/project.service';
import { SLObject, ObjectService } from 'src/app/services/object/object.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {
  loadingObjects = true;

  constructor(private router: Router, public projectService: ProjectService, public objectService: ObjectService) { }

  
  async ngOnInit() {
    await this.loadProject();

    try {
      await this.objectService.getObjects(this.projectService.currentProject.id);
    } catch (err) {
      console.error(err);
    }

    this.loadingObjects = false;
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

}
