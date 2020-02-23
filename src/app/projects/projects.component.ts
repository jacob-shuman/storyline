import { Component, OnInit } from '@angular/core';
import { ProjectService, SLProject } from '../services/project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  loadingProjects = true;

  constructor(public projectService: ProjectService, private router: Router) { }

  async ngOnInit() {
    this.projectService.currentProject = undefined;

    try {
      await this.projectService.getProjects();
    } catch (err) {
      console.error(err);
    }

    this.loadingProjects = false;
  }

}
