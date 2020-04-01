import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { SLObject, ObjectService, SLUpdateObjectResult } from 'src/app/services/object/object.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TOAST } from 'src/app/constants';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  object: SLObject;
  loadingObject = true;

  constructor(public router: Router, public projectService: ProjectService, public objectService: ObjectService) { }

  async ngOnInit() {
    await this.loadProject();

    try {
      await this.objectService.getObjects(this.projectService.currentProject.id);
      this.objectService.currentObject = await this.objectService.getObjectById(
        this.projectService.currentProject.id,
        this.router.parseUrl(this.router.url).root.children.primary.segments[3].path
      );

      this.object = { ...this.objectService.currentObject };
    } catch (err) {
      this.router.navigate(['projects', this.projectService.currentProject.id, 'objects']);
    }

    this.loadingObject = false;
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
    if (!this.object.name || this.object.name.trim() === '') {
      return false;
    }

    if (!this.object.description || this.object.description.trim() === '') {
      return false;
    }

    if (
      (this.object.name === this.objectService.currentObject.name) &&
      (this.object.description === this.objectService.currentObject.description)) {
      return false;
    }

    return true;
  }

  public async updateObject(): Promise<void> {
    this.loadingObject = true;

    try {
      const result: SLUpdateObjectResult = await this.objectService.updateObject(this.object);

      if (result.success) {
        await this.objectService.getObjects(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.object.projectId, 'objects']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)"> "${this.object.name}" was updated successfully!</span` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error updating "${this.object.name}"</span>`, text: error });
    }

    this.loadingObject = false;
  }
}
