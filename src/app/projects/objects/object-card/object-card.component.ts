import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLObject, ObjectService } from 'src/app/services/object/object.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.css']
})
export class ObjectCardComponent {
  @Input() object: SLObject;

  constructor(private router: Router, private projectService: ProjectService, private objectService: ObjectService) { }

  async selectObject() {
    this.router.navigate(
      ['project', this.projectService.currentProject.id, 'objects', this.object.id],
      { state: { object: this.object } }
    );
  }

  async deleteObject() {
    const result = await Swal.fire({
      ...TOAST.CONFIRM_DELETE,
      confirmButtonText: 'Delete'
    });

    if (result.value) {
      try {
        await this.objectService.deleteObject(this.object);
        await Swal.fire(TOAST.OBJECT_DELETED);
      } catch (error) {
        Swal.fire({ ...TOAST.FAIL, title: `There was an error deleting "${this.object.name}"`, text: error });
      }

      await this.objectService.getObjects(this.projectService.currentProject.id, true);
    }
  }

}
