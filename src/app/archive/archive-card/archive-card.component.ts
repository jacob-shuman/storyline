import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { SLProject, ProjectService } from 'src/app/services/project/project.service';
import { TOAST } from 'src/app/constants';

@Component({
  selector: 'app-archive-card',
  templateUrl: './archive-card.component.html',
  styleUrls: ['./archive-card.component.css']
})
export class ArchiveCardComponent {
  @Input() project: SLProject;
  loadingArchive = true;

  constructor(private projectService: ProjectService, private router: Router) { }

  selectProject() {
    this.projectService.currentProject = this.project;
    this.router.navigate(['project', this.project.id, 'characters']);
  }

  async unarchiveProject() {
    await this.projectService.unarchiveProject(this.project.id);
    await this.projectService.getProjects(true);
  }

  async deleteProject() {
    Swal.fire({
      ...TOAST.CONFIRM_DELETE,
      confirmButtonText: 'BE GONE PROJECT!'
    }).then(async (result) => {
      if (result.value) {
        await this.projectService.deleteProject(this.project.id);
        await this.projectService.getProjects(true);
        Swal.fire(TOAST.PROJECT_DELETED);
      }
    });
  }

}
