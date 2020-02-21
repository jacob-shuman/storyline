import { Component, OnInit } from '@angular/core';

import Typewriter from 'typewriter-effect/dist/core';

import { HOME_TYPEWRITER_VERBS, HOME_TYPEWRITER_NOUNS } from "../constants"
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private typewriter: Typewriter;
  private typewriterStrings: string[];

  constructor(public authService: AuthService) { }

  ngOnInit() {

    this.typewriterStrings = [];

    const typewriterVariations = Math.floor(Math.random() * 200)
    
    for (let i = 0; i < typewriterVariations; ++i)
      this.typewriterStrings.push(`${HOME_TYPEWRITER_VERBS[Math.floor(Math.random() * HOME_TYPEWRITER_VERBS.length)]} ${HOME_TYPEWRITER_NOUNS[Math.floor(Math.random() * HOME_TYPEWRITER_NOUNS.length)]}`);


    this.typewriter = new Typewriter('#typewriter',
      {
        strings: this.typewriterStrings,
        autoStart: true,
        loop: true,
      }
    );

    this.typewriter.start();
  }

}
