import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_ENDPOINT } from 'src/app/constants';

import { AuthService } from '../auth/auth.service';

export interface SLGroup {
  id: string;
  name: string;
  description?: string;
  projectId: string;
}

export interface SLMongoGroup {
  _id: string;
  Name: string;
  Description: string;
  Project_ID: string;
}

export interface SLCreateGroupResult {
  success: boolean;
  error?: any;
}

export interface SLGetGroupByIdResult {
  success: boolean;
  error?: any;
}

export interface SLUpdateGroupResult {
  success: boolean;
  group: SLMongoGroup;
  error?: any;
}

export interface SLGetAllGroupsResult {
  groups: SLMongoGroup[];
  success: boolean;
  error?: any;
}

export interface SLDeleteGroupResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groups: SLGroup[];
  projectId: string;

  constructor(private authService: AuthService, private http: HttpClient) { }

  /**
   * @param group A group directly from mongo
   *
   * @returns The same group in a cleaner/consistent format
   */
  private parseMongoGroup(group: SLMongoGroup): SLGroup {
    return {
      id: group._id,
      name: group.Name,
      description: group.Description,
      projectId: group.Project_ID
    } as SLGroup;
  }

  /**
   * @param group The group details
   *
   * @returns Whether group creation was successful
   */
  async createGroup(group: SLGroup): Promise<SLCreateGroupResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { group };
      const url = `${API_ENDPOINT}/project/${group.projectId}/groups/create`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLCreateGroupResult;

      if (!result.success || result.error) {
        throw Error(result.error);
      }

      return result;
    } catch (err) {
      throw err;
    }
  }


  async getGroupById(projectId: string, groupId: string): Promise<SLGroup> {
    if (!this.groups || this.groups.length < 1) {
      await this.getGroups(projectId);
    }

    const group = this.groups.find(char => char.id === groupId);

    if (!group) {
      throw Error(`No group with ID of ${groupId}`);
    }

    return group;
  }

  async getGroups(projectId: string, forceUpdate: boolean = false): Promise<SLGroup[]> {
    if (!this.groups || (this.groups && this.projectId !== projectId) || forceUpdate) {
      try {
        const params = { password: this.authService.user.password };
        const url = `${API_ENDPOINT}/project/${projectId}/groups`;
        const result = await this.http.get(url, { params }).toPromise() as SLGetAllGroupsResult;

        this.groups = result.groups.map(this.parseMongoGroup);
        this.projectId = projectId;
      } catch (err) {
        throw err;
      }
    }

    return this.groups;
  }

  async updateGroup(group: SLGroup): Promise<SLGroup> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { group };
      const url = `${API_ENDPOINT}/project/${group.projectId}/groups/update`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLUpdateGroupResult;

      return this.parseMongoGroup(result.group);
    } catch (err) {
      throw err;
    }
  }

  async deleteGroup(group: SLGroup): Promise<SLDeleteGroupResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { group };
      const url = `${API_ENDPOINT}/project/${group.projectId}/groups/delete`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLDeleteGroupResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}
