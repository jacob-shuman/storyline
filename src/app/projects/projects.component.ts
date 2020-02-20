import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ProjectService, SLProject } from '../services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  projects: SLProject[];

  constructor(private projectService: ProjectService) { }

  async ngOnInit() {
    this.projects = await this.projectService.getAllProjects();
  }

  private showCreateModal() {

  }

}
