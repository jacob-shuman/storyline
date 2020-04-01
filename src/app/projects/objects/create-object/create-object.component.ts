import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLObject, SLCreateObjectResult, ObjectService } from 'src/app/services/object/object.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {
  loadingProject = true;
  loadingObject = false;
  object: SLObject;

  constructor(private router: Router, public projectService: ProjectService, public objectService: ObjectService) { }

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

    this.object = {
      id: '',
      name: '',
      description: '',
      projectId: this.projectService.currentProject.id
    };

    this.loadingProject = false;
  }

  public validateFields(): boolean {
    if (!this.object.name || this.object.name.trim() === '') {
      return false;
    }

    if (!this.object.description || this.object.description.trim() === '') {
      return false;
    }

    return true;
  }

  public async createObject(): Promise<void> {
    this.loadingObject = true;

    try {
      const result: SLCreateObjectResult = await this.objectService.createObject(this.object);

      if (result.success) {
        await this.objectService.getObjects(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.object.projectId, 'objects']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)">"${this.object.name}" was created successfully!</span>` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error creating "${this.object.name}"</span>`, text: error });
    }

    this.loadingObject = true;
  }
}
