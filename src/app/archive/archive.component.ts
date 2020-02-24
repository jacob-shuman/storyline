import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  loadingArchive = true;

  constructor(public projectService: ProjectService) { }

  async ngOnInit() {
    this.projectService.currentProject = undefined;

    try {
      await this.projectService.getProjects();
    } catch (err) {
      console.error(err);
    }

    this.loadingArchive = false;
  }

}
