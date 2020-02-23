import { Component, OnInit } from '@angular/core';
import { SLCharacter } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: SLCharacter[];
  loadingCharacters = true;

  constructor() { }

  ngOnInit() {
    this.loadingCharacters = false;
  }

}
