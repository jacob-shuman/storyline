import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { ProjectService, SLProject } from 'src/app/services/project/project.service';
import { TOAST } from 'src/app/constants';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  project: SLProject;
  loadingProject = true;
  updatingProject = false;

  constructor(public projectService: ProjectService, private router: Router) {
    this.project = { ...projectService.currentProject };
  }

  ngOnInit() {
    this.loadProject();
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1];

      try {
        this.projectService.currentProject = await this.projectService.getProjectsById(projectId.path);
        this.project = { ...this.projectService.currentProject };
      } catch (err) {
        this.router.navigate(['projects']);
      }
    }

    this.loadingProject = false;
  }

  async archiveProject() {
    Swal.fire(TOAST.CONFIRM_ARCHIVE_PROJECT).then(async (result) => {
      if (result.value) {
        await this.projectService.archiveProject(this.project.id);
        await this.projectService.getProjects(true);
        Swal.fire(TOAST.PROJECT_ARCHIVED);

        this.router.navigate(['projects']);
      }
    });
  }

  async deleteProject() {
    Swal.fire(TOAST.CONFIRM_DELETE_PROJECT).then(async (result) => {
      if (result.value) {
        await this.projectService.deleteProject(this.project.id);
        await this.projectService.getProjects(true);
        Swal.fire(TOAST.PROJECT_DELETED);

        this.router.navigate(['projects']);
      }
    });
  }

  async updateProject() {
    try {
      if (this.projectService.currentProject.name !== this.project.name || this.projectService.currentProject.description !== this.project.description) {
        this.updatingProject = true;
        
        this.project = await this.projectService.updateProject(this.project.id, this.project.name, this.project.description);
        this.projectService.currentProject = { ...this.project };
        
        this.updatingProject = false;

        Swal.fire(TOAST.SAVE_SUCCESS);
      }
    } catch (err) {
      console.log('There was an error saving your changes: ', err);
      Swal.fire(TOAST.SAVE_FAIL);
    }
  }

}
