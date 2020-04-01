import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLCharacter, SLCreateCharacterResult, CharacterService } from 'src/app/services/character/character.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { ObjectService } from 'src/app/services/object/object.service';
import { GroupService } from 'src/app/services/group/group.service';
import { AlertService } from 'src/app/services/alert.service';

export type SLCreateCharacterSelectionType = 'group' | 'object' | 'place' | 'event' | 'none';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  loadingProject = true;
  loadingCharacter = false;
  character: SLCharacter;

  loading = false;
  elements: any[];

  objectError: string;
  groupError: string;

  // Anything other than "none" will render a list of possibly relating elements
  selection: SLCreateCharacterSelectionType = 'none';

  constructor(
    private router: Router,
    private alertService: AlertService,
    public projectService: ProjectService,
    public characterService: CharacterService,
    public objectService: ObjectService,
    public groupService: GroupService
  ) { }

  ngOnInit() {
    this.loadProject();
  }

  selectElement(element: any) {
    element.selected = !element.selected;
  }

  async setSelection(selection: SLCreateCharacterSelectionType) {
    this.loading = true;
    this.selection = 'none';

    switch (selection) {
      case 'object':
        this.objectError = '';

        const objects = (await this.objectService.getObjects(this.projectService.currentProject.id))
          .map((element) => ({ ...element, selected: false }));

        if (objects.length < 1) {
          this.objectError = 'Please add an object to the project';
        } else {
          this.selection = 'object';
          this.elements = objects;
        }

        break;
      case 'group':
        this.objectError = '';

        const groups = (await this.groupService.getGroups(this.projectService.currentProject.id))
          .map((element) => ({ ...element, selected: false }));

        if (groups.length < 1) {
          this.groupError = 'Please add a group to the project';
        } else {
          this.selection = 'group';
          this.elements = groups;
        }

        break;

    }

    this.loading = false;
  }

  resetSelection() {
    this.selection = 'none';
  }
  ;
  async loadProject() {
    if (!this.projectService.currentProject) {
      const projectId = this.router.parseUrl(this.router.url).root.children.primary.segments[1];

      try {
        this.projectService.currentProject = await this.projectService.getProjectById(projectId.path);
      } catch (err) {
        this.router.navigate(['projects']);
      }
    }

    this.character = {
      id: '',
      name: '',
      description: '',
      projectId: this.projectService.currentProject.id
    };

    this.loadingProject = false;
  }

  public validateFields(): boolean {
    if (!this.character.name || this.character.name.trim() === '') {
      return false;
    }

    if (!this.character.description || this.character.description.trim() === '') {
      return false;
    }

    return true;
  }

  public async createCharacter(): Promise<void> {
    this.loadingCharacter = true;

    try {
      const result: SLCreateCharacterResult = await this.characterService.createCharacter(this.character);

      if (result.success) {
        await this.characterService.getCharacters(this.projectService.currentProject.id, true);
        this.router.navigate(['project', this.character.projectId, 'characters']);
      } else if (result.error) {
        throw result.error;
      }
      Swal.fire({ ...TOAST.SUCCESS, title: `<span style="color: var(--text)"> "${this.character.name}" was created successfully!</span` });

    } catch (error) {
      Swal.fire({ ...TOAST.FAIL, title: `<span style="color: var(--text)">There was an error creating "${this.character.name}"</span>`, text: error });
    }

    this.loadingCharacter = true;
  }

  async addAttribute() {
    await this.alertService.addAttribute();
  }
}
