import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLGroup, GroupService } from 'src/app/services/group/group.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent{
  @Input() group: SLGroup;

  constructor(private router: Router, private projectService: ProjectService, private groupService: GroupService) { }

  async selectGroup() {
    await Swal.fire(TOAST.UNDER_CONSTRUCTION);
    // this.router.navigate(['project', this.projectService.currentProject.id, 'groups', this.group.id]);
  }

  async deleteGroup() {
    const result = await Swal.fire({
      ...TOAST.CONFIRM_DELETE,
      confirmButtonText: 'BE GONE GROUP!'
    });

    if (result.value) {
      try {
        await this.groupService.deleteGroup(this.group);
        await Swal.fire(TOAST.GROUP_DELETED);
      } catch (error) {
        Swal.fire({ ...TOAST.FAIL, title: `There was an error deleting "${this.group.name}"`, text: error });
      }

      await this.groupService.getGroups(this.projectService.currentProject.id, true);
    }
  }

}
