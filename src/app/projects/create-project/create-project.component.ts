import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService, SLProject, SLCreateProjectResult } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.sass']
})
export class CreateProjectComponent implements OnInit {
  name: string;
  description: string;

  loadingProjects = true;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.loadProjects();
  }

  async loadProjects() {
    try {
      await this.projectService.getProjects();

      if (this.projectService.allProjects.length > 2) {
        this.router.navigate(['projects']);
      }
    } catch (err) {
      console.error(err);
    }

    this.loadingProjects = false;
  }

  async onCreateProjectSubmit() {
    try {
      const result: SLCreateProjectResult = await this.projectService.createProject(this.name, this.description);

      if (result.success) {
        await this.projectService.getProjects(true);
        this.router.navigate(['projects']);
      } else if (result.error) {
        throw result.error;
      }
    } catch (error) {
      console.error(error);
    }
  }

}
