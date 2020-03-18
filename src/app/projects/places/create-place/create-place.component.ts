import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLPlace, SLCreatePlaceResult, PlaceService } from 'src/app/services/place/place.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {
  loadingProject = true;
  loadingPlace = false;
  place: SLPlace;

  constructor(private router: Router, public projectService: ProjectService, public placeService: PlaceService) { }

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

    this.place = {
      id: '',
      name: '',
      description: '',
      projectId: this.projectService.currentProject.id
    };

    this.loadingProject = false;
  }

  public validateFields(): boolean {
    if (!this.place.name || this.place.name.trim() === '') {
      return false;
    }

    if (!this.place.description || this.place.description.trim() === '') {
      return false;
    }

    return true;
  }

  public async createPlace(): Promise<void> {
    this.loadingPlace = true;

    try {
      const result: SLCreatePlaceResult = await this.placeService.createPlace(this.place);

      if (result.success) {
        await this.placeService.getPlaces(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.place.projectId, 'places']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `"${this.place.name}" was created successfully!` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `There was an error creating "${this.place.name}" :(`, text: error });
    }

    this.loadingPlace = true;
  }
}
