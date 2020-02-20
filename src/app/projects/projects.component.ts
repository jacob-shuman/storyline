import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  constructor(private authService: AuthService, private projectService: ProjectService) { }

  ngOnInit() {
  }

}
