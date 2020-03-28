import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from 'src/app/services/project/project.service';
import { SLGroup, GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  loadingGroups = true;

  constructor(private router: Router, public projectService: ProjectService, public groupService: GroupService) { }


  async ngOnInit() {
    this.loadingGroups = true;

    await this.loadProject();

    try {
      await this.groupService.getGroups(this.projectService.currentProject.id);
    } catch (err) {
      console.error(err);
    }

    this.loadingGroups = false;
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1];

      try {
        this.projectService.currentProject = await this.projectService.getProjectById(projectId.path);
      } catch (err) {
        this.router.navigate(['projects']);
      }
    }
  }

}
