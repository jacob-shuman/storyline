import { Component, Input } from '@angular/core';
import { SLProject, ProjectService } from 'src/app/services/project/project.service';
import { Router } from '@angular/router';

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

  async deleteProject() {
    await this.projectService.deleteProject(this.project.id);
    await this.projectService.getProjects(true);
  }

}
