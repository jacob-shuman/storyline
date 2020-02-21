import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService, SLProject, SLCreateProjectResult } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.sass']
})
export class CreateProjectComponent {
  name: string;
  description: string;

  constructor(private projectService: ProjectService, private router: Router) { }

  async onCreateProjectSubmit() {
    try {
      const result: SLCreateProjectResult = await this.projectService.createProject(this.name, this.description);

      if (result.success) {
        this.router.navigate(['projects']);
      } else if (result.error) {
        throw result.error;
      }
    } catch (error) {
      console.error(error);
    }
  }

}
