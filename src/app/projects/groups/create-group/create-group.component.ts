import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLGroup, SLCreateGroupResult, GroupService } from 'src/app/services/group/group.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  loadingProject = true;
  loadingGroup = false;
  group: SLGroup;

  constructor(private router: Router, public projectService: ProjectService, public groupService: GroupService) { }

  ngOnInit() {
    this.loadProject();
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

    this.group = {
      id: '',
      name: '',
      description: '',
      projectId: this.projectService.currentProject.id
    };

    this.loadingProject = false;
  }

  public validateFields(): boolean {
    if (!this.group.name || this.group.name.trim() === '') {
      return false;
    }

    if (!this.group.description || this.group.description.trim() === '') {
      return false;
    }

    return true;
  }

  public async createGroup(): Promise<void> {
    this.loadingGroup = true;

    try {
      const result: SLCreateGroupResult = await this.groupService.createGroup(this.group);

      if (result.success) {
        await this.groupService.getGroups(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.group.projectId, 'groups']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)">"${this.group.name}" was created successfully!</span>` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error creating "${this.group.name}"</span>`, text: error });
    }

    this.loadingGroup = true;
  }
}
