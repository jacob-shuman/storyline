import { Component, Input } from '@angular/core';
import { SLProject, ProjectService } from 'src/app/services/project/project.service';
import { Router } from '@angular/router';
import Swal from 'ngx-angular8-sweetalert2';

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
    this.router.navigate(['project', this.project.id, 'characters']);
  }

  async archiveProject() {
    Swal.fire({
      title: 'Woah, are you sure about this?',
      text: "This can be reversed in the project archive!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yea, Skedaddle!'
    }).then(async (result) => {
      if (result.value) {
        await this.projectService.archiveProject(this.project.id);
        await this.projectService.getProjects(true);
        Swal.fire({
          title: 'See Ya',
          text: 'Your project has been moved to the archive',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  }

  async deleteProject() {
    Swal.fire({
      title: 'Woah, are you sure about this?',
      text: "You can't undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'BE GONE PROJECT!'
    }).then(async (result) => {
      if (result.value) {
        await this.projectService.deleteProject(this.project.id);
        await this.projectService.getProjects(true);
        Swal.fire({
          title: 'Its Gone...',
          text: 'Your project has been deleted :(',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  }

}
