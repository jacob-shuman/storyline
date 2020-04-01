import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { SLPlace, PlaceService, SLUpdatePlaceResult } from 'src/app/services/place/place.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TOAST } from 'src/app/constants';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  place: SLPlace;
  loadingPlace = true;

  constructor(public router: Router, public projectService: ProjectService, public placeService: PlaceService) { }

  async ngOnInit() {
    await this.loadProject();

    try {
      await this.placeService.getPlaces(this.projectService.currentProject.id);
      this.placeService.currentPlace = await this.placeService.getPlaceById(
        this.projectService.currentProject.id,
        this.router.parseUrl(this.router.url).root.children.primary.segments[3].path
      );

      this.place = { ...this.placeService.currentPlace };
    } catch (err) {
      this.router.navigate(['projects', this.projectService.currentProject.id, 'places']);
    }

    this.loadingPlace = false;
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
    if (!this.place.name || this.place.name.trim() === '') {
      return false;
    }

    if (!this.place.description || this.place.description.trim() === '') {
      return false;
    }

    if (
      (this.place.name === this.placeService.currentPlace.name) &&
      (this.place.description === this.placeService.currentPlace.description)) {
      return false;
    }

    return true;
  }

  public async updatePlace(): Promise<void> {
    this.loadingPlace = true;

    try {
      const result: SLUpdatePlaceResult = await this.placeService.updatePlace(this.place);

      if (result.success) {
        await this.placeService.getPlaces(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.place.projectId, 'places']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)"> "${this.place.name}" was updated successfully!</span` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error updating "${this.place.name}"</span>`, text: error });
    }

    this.loadingPlace = false;
  }
}
