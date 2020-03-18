import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from 'src/app/services/project/project.service';
import { SLPlace, PlaceService } from 'src/app/services/place/place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  loadingPlaces = true;

  constructor(private router: Router, public projectService: ProjectService, public placeService: PlaceService) { }

  
  async ngOnInit() {
    await this.loadProject();

    try {
      await this.placeService.getPlaces(this.projectService.currentProject.id);
    } catch (err) {
      console.error(err);
    }

    this.loadingPlaces = false;
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
