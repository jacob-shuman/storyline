import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { SLGroup, GroupService, SLUpdateGroupResult } from 'src/app/services/group/group.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TOAST } from 'src/app/constants';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  group: SLGroup;
  loadingGroup = true;

  constructor(public router: Router, public projectService: ProjectService, public groupService: GroupService) { }

  async ngOnInit() {
    await this.loadProject();

    try {
      await this.groupService.getGroups(this.projectService.currentProject.id);
      this.groupService.currentGroup = await this.groupService.getGroupById(
        this.projectService.currentProject.id,
        this.router.parseUrl(this.router.url).root.children.primary.segments[3].path
      );

      this.group = { ...this.groupService.currentGroup };
    } catch (err) {
      this.router.navigate(['projects', this.projectService.currentProject.id, 'groups']);
    }

    this.loadingGroup = false;
  }

  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path;

      try {
        this.projectService.currentProject = await this.projectService.getProjectById(projectId);
      } catch (err) {
        this.router.navigate(['projects']);
      }
    }
  }

  public validateFields(): boolean {
    if (!this.group.name || this.group.name.trim() === '') {
      return false;
    }

    if (!this.group.description || this.group.description.trim() === '') {
      return false;
    }

    if (
      (this.group.name === this.groupService.currentGroup.name) &&
      (this.group.description === this.groupService.currentGroup.description)) {
      return false;
    }

    return true;
  }

  public async updateGroup(): Promise<void> {
    this.loadingGroup = true;

    try {
      const result: SLUpdateGroupResult = await this.groupService.updateGroup(this.group);

      if (result.success) {
        await this.groupService.getGroups(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.group.projectId, 'groups']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)"> "${this.group.name}" was updated successfully!</span` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error updating "${this.group.name}"</span>`, text: error });
    }

    this.loadingGroup = false;
  }
}
