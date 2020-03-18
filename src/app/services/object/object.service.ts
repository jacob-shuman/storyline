import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_ENDPOINT } from 'src/app/constants';

import { AuthService } from '../auth/auth.service';

export interface SLObject {
  id: string;
  name: string;
  description?: string;
  projectId: string;
}

export interface SLMongoObject {
  _id: string;
  Name: string;
  Description: string;
  Project_ID: string;
}

export interface SLCreateObjectResult {
  success: boolean;
  error?: any;
}

export interface SLGetObjectByIdResult {
  success: boolean;
  error?: any;
}

export interface SLUpdateObjectResult {
  success: boolean;
  object: SLMongoObject;
  error?: any;
}

export interface SLGetAllObjectsResult {
  objects: SLMongoObject[];
  success: boolean;
  error?: any;
}

export interface SLDeleteObjectResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  objects: SLObject[];

  constructor(private authService: AuthService, private http: HttpClient) { }

  /**
   * @param object A object directly from mongo
   *
   * @returns The same object in a cleaner/consistent format
   */
  private parseMongoObject(object: SLMongoObject): SLObject {
    return {
      id: object._id,
      name: object.Name,
      description: object.Description,
      projectId: object.Project_ID
    } as SLObject;
  }

  /**
   * @param projectId The project to create the object on
   * @param object The object details
   *
   * @returns Whether object creation was successful
   */
  async createObject(object: SLObject): Promise<SLCreateObjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { object };
      const url = `${API_ENDPOINT}/project/${object.projectId}/objects/create`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLCreateObjectResult;

      if (!result.success || result.error) {
        throw Error(result.error);
      }

      return result;
    } catch (err) {
      throw err;
    }
  }


  async getObjectById(projectId: string, objectId: string): Promise<SLObject> {
    if (!this.objects || this.objects.length < 1) {
      await this.getObjects(projectId);
    }

    const object = this.objects.find(char => char.id === objectId);

    if (!object) {
      throw Error(`No object with ID of ${objectId}`);
    }

    return object;
  }

  async getObjects(projectId: string, forceUpdate: boolean = false): Promise<SLObject[]> {
    if (!this.objects || forceUpdate) {
      try {
        const params = { password: this.authService.user.password };
        const url = `${API_ENDPOINT}/project/${projectId}/objects`;
        const result = await this.http.get(url, { params }).toPromise() as SLGetAllObjectsResult;

        this.objects = result.objects.map(this.parseMongoObject);
      } catch (err) {
        throw err;
      }
    }

    return this.objects;
  }

  async updateObject(object: SLObject): Promise<SLObject> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { object };
      const url = `${API_ENDPOINT}/project/${object.projectId}/objects/update`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLUpdateObjectResult;

      return this.parseMongoObject(result.object);
    } catch (err) {
      throw err;
    }
  }

  async deleteObject(object: SLObject): Promise<SLDeleteObjectResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { object };
      const url = `${API_ENDPOINT}/project/${object.projectId}/objects/delete`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLDeleteObjectResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}
