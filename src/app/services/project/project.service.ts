import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/constants';
import { AuthService } from '../auth/auth.service';

export interface SLProject {
  name: string;
  description?: string;
}

export interface SLCreateProjectResult {
  success: boolean;
  error?: any;
}

export interface SLGetAllProjectsResult {
  projects: any[];
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  /**
   * @param project The project details
   * 
   * @returns Whether project creation was successful
   */
  async createProject(project: SLProject): Promise<SLCreateProjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { email: this.authService.user.email, name: project.name, description: project.description };
      const result: SLCreateProjectResult = await this.http.post(`${API_ENDPOINT}/create/project`, body, { headers }).toPromise() as SLCreateProjectResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getProjects() {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { id: this.authService.user.id };
      const result: SLGetAllProjectsResult = await this.http.get(`${API_ENDPOINT}/projects/${this.authService.user.id}`).toPromise() as SLGetAllProjectsResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}
