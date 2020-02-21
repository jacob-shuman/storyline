import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/constants';
import { AuthService } from '../auth/auth.service';

export interface SLProject {
  name: string;
  description?: string;
  timeFormat: string;
  archived: string;
  countdown: string;
  email: string;
}

export interface SLMongoProject {
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

export interface SLGetAllProjectsResult {
  projects: SLMongoProject[];
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

  async getProjects(): Promise<SLGetAllProjectsResult> {
    try {
      const result: SLGetAllProjectsResult = await this.http.get(`${API_ENDPOINT}/projects/${this.authService.user.id}`).toPromise() as SLGetAllProjectsResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}
