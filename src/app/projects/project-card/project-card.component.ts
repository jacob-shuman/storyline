import { Component, OnInit, Input } from '@angular/core';
import { SLProject } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: SLProject;

  constructor() { }

  ngOnInit() {
  }

}
