import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLPlace, PlaceService } from 'src/app/services/place/place.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent {
  @Input() place: SLPlace;

  constructor(private router: Router, private projectService: ProjectService, private placeService: PlaceService) { }

  async selectPlace() {
    this.router.navigate(
      ['project', this.projectService.currentProject.id, 'places', this.place.id],
      { state: { place: this.place } }
    );
  }

  async deletePlace() {
    const result = await Swal.fire({
      ...TOAST.CONFIRM_DELETE,
      confirmButtonText: 'Delete'
    });

    if (result.value) {
      try {
        await this.placeService.deletePlace(this.place);
        await Swal.fire(TOAST.PLACE_DELETED);
      } catch (error) {
        Swal.fire({ ...TOAST.FAIL, title: `There was an error deleting "${this.place.name}"`, text: error });
      }

      await this.placeService.getPlaces(this.projectService.currentProject.id, true);
    }
  }

}
