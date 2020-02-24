import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/constants';
import { AuthService } from '../auth/auth.service';

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

export interface SLCharacter {
  id: string;
  name: string;
  description?: string;
  projectId: string
}

export interface SLMongoCharacter {
  _id: string;
  Name: string;
  Description: string;
  Project_ID: string
}

export interface SLCreateProjectResult {
  success: boolean;
  error?: any;
}

export interface SLGetProjectByIdResult {
  success: boolean;
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

  constructor(private authService: AuthService, private http: HttpClient) { }

  /**
   * @param projects list of projects directly from mongo
   * 
   * @returns list of projects in a consistent format
   */
  private parseMongoProjects(projects: SLMongoProject[]): SLProject[] {
    return projects.map((project) => {
      return {
        id: project._id,
        name: project.Name,
        description: project.Description,
        timeFormat: project.Time_Format,
        archived: project.Archived,
        countdown: project.Countdown,
        email: project.User_email
      } as SLProject;
    });
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
      const result: SLCreateProjectResult = await this.http.post(`${API_ENDPOINT}/project/create`, body, { headers }).toPromise() as SLCreateProjectResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getProjectsById(id: string): Promise<SLProject> {
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
    if (!this.projects || forceUpdate) {
      try {
        const result: SLGetAllProjectsResult = await this.http.get(`${API_ENDPOINT}/projects/${this.authService.user.id}`).toPromise() as SLGetAllProjectsResult;

        this.allProjects = this.parseMongoProjects(result.projects);
        this.projects = this.allProjects.filter((project) => !project.archived);
        this.archivedProjects = this.allProjects.filter((project) => project.archived);
      } catch (err) {
        throw err;
      }
    }

    return this.projects;
  }

  async unarchiveProject(id: string): Promise<SLUnarchiveProjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const result: SLUnarchiveProjectResult = await this.http.post(`${API_ENDPOINT}/project/${id}/unarchive`, {}, { headers }).toPromise() as SLUnarchiveProjectResult;
      
      return result;
    } catch (err) {
      throw err;
    }
  }

  async archiveProject(id: string): Promise<SLArchiveProjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const result: SLArchiveProjectResult = await this.http.post(`${API_ENDPOINT}/project/${id}/archive`, {}, { headers }).toPromise() as SLArchiveProjectResult;
      
      return result;
    } catch (err) {
      throw err;
    }
  }

  async deleteProject(id: string): Promise<SLDeleteProjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const result: SLDeleteProjectResult = await this.http.post(`${API_ENDPOINT}/project/${id}/delete`, {}, { headers }).toPromise() as SLDeleteProjectResult;
      
      return result;
    } catch (err) {
      throw err;
    }
  }
}
