import { Injectable } from '@angular/core';

export interface SLProject {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  async getAllProjects() {
    return [];
  }
}
