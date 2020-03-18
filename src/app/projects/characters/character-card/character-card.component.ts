import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'ngx-angular8-sweetalert2';

import { TOAST } from 'src/app/constants';
import { SLCharacter, CharacterService } from 'src/app/services/character/character.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent {
  @Input() character: SLCharacter;

  constructor(private router: Router, private projectService: ProjectService, private characterService: CharacterService) { }

  async selectCharacter() {
    await Swal.fire(TOAST.UNDER_CONSTRUCTION);
    // this.router.navigate(['project', this.projectService.currentProject.id, 'characters', this.character.id]);
  }

  async deleteCharacter() {
    const result = await Swal.fire({
      ...TOAST.CONFIRM_DELETE,
      confirmButtonText: 'BE GONE CHARACTER!'
    });

    if (result.value) {
      try {
        await this.characterService.deleteCharacter(this.character);
        await Swal.fire(TOAST.CHARACTER_DELETED);
      } catch (error) {
        Swal.fire({ ...TOAST.FAIL, title: `There was an error deleting "${this.character.name}"`, text: error });
      }

      await this.characterService.getCharacters(this.projectService.currentProject.id, true);
    }
  }

}
