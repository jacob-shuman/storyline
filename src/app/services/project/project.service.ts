import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/constants';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export interface SLProject {
  id: string;
  name: string;
  description?: string;
  timeFormat: string;
  archived: string;
  countdown: string;
  email: string;
}

export interface SLMongoProject {
  _id: string;
  Name: string;
  Description: string;
  Time_Format: string;
  Archived: string;
  Countdown: string;
  User_email: string;
}

export interface SLCreateProjectResult {
  success: boolean;
  error?: any;
}

export interface SLGetProjectByIdResult {
  success: boolean;
  error?: any;
}

export interface SLUpdateProjectResult {
  success: boolean;
  project: SLMongoProject;
  error?: any;
}

export interface SLGetAllProjectsResult {
  projects: SLMongoProject[];
  success: boolean;
  error?: any;
}

export interface SLArchiveProjectResult {
  success: boolean;
  error?: any;
}

export interface SLUnarchiveProjectResult {
  success: boolean;
  error?: any;
}

export interface SLDeleteProjectResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  allProjects: SLProject[];
  projects: SLProject[];
  archivedProjects: SLProject[];
  currentProject?: SLProject;

  lastId: string;

  constructor(private authService: AuthService, private http: HttpClient) { }

  /**
   * @param project A project directly from mongo
   *
   * @returns The same project in a cleaner/consistent format
   */
  private parseMongoProject(project: SLMongoProject): SLProject {
    return {
      id: project._id,
      name: project.Name,
      description: project.Description,
      timeFormat: project.Time_Format,
      archived: project.Archived,
      countdown: project.Countdown,
      email: project.User_email
    } as SLProject;
  }

  /**
   * @param project The project details
   *
   * @returns Whether project creation was successful
   */
  async createProject(name: string, description: string): Promise<SLCreateProjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { email: this.authService.user.email, name, description };
      const url = `${API_ENDPOINT}/project/create`;

      const result: SLCreateProjectResult = await this.http.post(url, body, { headers }).toPromise() as SLCreateProjectResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getProjectById(id: string): Promise<SLProject> {
    if (!this.projects || this.projects.length < 1) {
      await this.getProjects();
    }

    const project = this.projects.find(prj => prj.id === id);

    if (!project) {
      throw Error(`No project with ID of ${id}`);
    }

    return project;
  }

  async getProjects(forceUpdate: boolean = false): Promise<SLProject[]> {
    if (!this.projects || (this.lastId && this.authService.user.id !== this.lastId) || forceUpdate) {
      try {
        const params = { password: this.authService.user.password };
        const url = `${API_ENDPOINT}/projects/${this.authService.user.id}`;

        const result = await this.http.get(url, { params }).toPromise() as SLGetAllProjectsResult;

        this.lastId = this.authService.user.id;
        this.allProjects = result.projects.map(this.parseMongoProject);
        this.projects = this.allProjects.filter((project) => !project.archived);
        this.archivedProjects = this.allProjects.filter((project) => project.archived);
      } catch (err) {
        throw err;
      }
    }

    return this.projects;
  }

  async updateProject(id: string, name: string, description: string): Promise<SLProject> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { name, description };
      const url = `${API_ENDPOINT}/update/project/${id}`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLUpdateProjectResult;

      return this.parseMongoProject(result.project);
    } catch (err) {
      throw err;
    }
  }

  async unarchiveProject(id: string): Promise<SLUnarchiveProjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const url = `${API_ENDPOINT}/project/${id}/unarchive`;

      const result = await this.http.post(url, {}, { headers }).toPromise() as SLUnarchiveProjectResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  async archiveProject(id: string): Promise<SLArchiveProjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const url = `${API_ENDPOINT}/project/${id}/archive`;

      const result = await this.http.post(url, {}, { headers }).toPromise() as SLArchiveProjectResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  async deleteProject(id: string): Promise<SLDeleteProjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const url = `${API_ENDPOINT}/project/${id}/delete`;

      const result = await this.http.post(url, {}, { headers }).toPromise() as SLDeleteProjectResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  clearProjects(): void {
    this.allProjects = undefined;
    this.projects = undefined;
    this.archivedProjects = undefined;
    this.currentProject = undefined;
  }
}
