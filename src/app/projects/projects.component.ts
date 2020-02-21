import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ProjectService, SLProject } from '../services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  projects: SLProject[] = [];
  loadingProjects = true;

  constructor(private projectService: ProjectService) { }

  async ngOnInit() {
    try {
      this.projects = (await this.projectService.getProjects()).projects.map((project) => {
        return {
          name: project.Name,
          description: project.Description,
          timeFormat: project.Time_Format,
          archived: project.Archived,
          countdown: project.Countdown,
          email: project.User_email
        } as SLProject;
      });
    } catch (err) {
      console.error(err);
    }

    this.loadingProjects = false;
  }

}
