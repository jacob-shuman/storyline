import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.sass']
})
export class NoContentComponent {
  @Input() title: string;
  @Input() subtitle: string;

  @Input() createButtonText: string;
  @Input() createButtonLink: string;
  @Input() disableCreateButton = false;

  @Input() projectsButton: boolean;

  @Input() altButtonText: string;
  @Input() altButtonLink: string;

  @Input() imagePath: string;
  @Input() imageTitle: string;
  @Input() imageAlt: string;

  constructor(private projectService: ProjectService, private router: Router) { }

  quitProjectButton() {
    this.projectService.currentProject = undefined;
    this.router.navigate(['projects']);
  }

}
