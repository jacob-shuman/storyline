import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLProject, ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project: SLProject;

  constructor(private projectService: ProjectService, private router: Router) { }

  selectProject() {
    this.projectService.currentProject = this.project;
    this.router.navigate(['project', this.project.id]);
  }

  async archiveProject() {
    Swal.fire(TOAST.CONFIRM_ARCHIVE_PROJECT).then(async (result) => {
      if (result.value) {
        await this.projectService.archiveProject(this.project.id);
        await this.projectService.getProjects(true);
        Swal.fire(TOAST.PROJECT_ARCHIVED);
      }
    });
  }

  async deleteProject() {
    Swal.fire({
      ...TOAST.CONFIRM_DELETE,
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.value) {
        await this.projectService.deleteProject(this.project.id);
        await this.projectService.getProjects(true);
        Swal.fire(TOAST.PROJECT_DELETED);
      }
    });
  }

}
