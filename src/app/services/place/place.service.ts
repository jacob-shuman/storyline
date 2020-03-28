import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_ENDPOINT } from 'src/app/constants';

import { AuthService } from '../auth/auth.service';

export interface SLPlace {
  id: string;
  name: string;
  description?: string;
  projectId: string;
}

export interface SLMongoPlace {
  _id: string;
  Name: string;
  Description: string;
  Project_ID: string;
}

export interface SLCreatePlaceResult {
  success: boolean;
  error?: any;
}

export interface SLGetPlaceByIdResult {
  success: boolean;
  error?: any;
}

export interface SLUpdatePlaceResult {
  success: boolean;
  place: SLMongoPlace;
  error?: any;
}

export interface SLGetAllPlacesResult {
  places: SLMongoPlace[];
  success: boolean;
  error?: any;
}

export interface SLDeletePlaceResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  places: SLPlace[];
  projectId: string;

  constructor(private authService: AuthService, private http: HttpClient) { }

  /**
   * @param place A place directly from mongo
   *
   * @returns The same place in a cleaner/consistent format
   */
  private parseMongoPlace(place: SLMongoPlace): SLPlace {
    return {
      id: place._id,
      name: place.Name,
      description: place.Description,
      projectId: place.Project_ID
    } as SLPlace;
  }

  /**
   * @param projectId The project to create the place on
   * @param place The place details
   *
   * @returns Whether place creation was successful
   */
  async createPlace(place: SLPlace): Promise<SLCreatePlaceResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { place };
      const url = `${API_ENDPOINT}/project/${place.projectId}/places/create`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLCreatePlaceResult;

      if (!result.success || result.error) {
        throw Error(result.error);
      }

      return result;
    } catch (err) {
      throw err;
    }
  }


  async getPlaceById(projectId: string, placeId: string): Promise<SLPlace> {
    if (!this.places || this.places.length < 1) {
      await this.getPlaces(projectId);
    }

    const place = this.places.find(char => char.id === placeId);

    if (!place) {
      throw Error(`No place with ID of ${placeId}`);
    }

    return place;
  }

  async getPlaces(projectId: string, forceUpdate: boolean = false): Promise<SLPlace[]> {
    if (!this.places || (this.places && this.projectId !== projectId) || forceUpdate) {
      try {
        const params = { password: this.authService.user.password };
        const url = `${API_ENDPOINT}/project/${projectId}/places`;
        const result = await this.http.get(url, { params }).toPromise() as SLGetAllPlacesResult;

        this.places = result.places.map(this.parseMongoPlace);
        this.projectId = projectId;
      } catch (err) {
        throw err;
      }
    }

    return this.places;
  }

  async updatePlace(place: SLPlace): Promise<SLPlace> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { place };
      const url = `${API_ENDPOINT}/project/${place.projectId}/places/update`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLUpdatePlaceResult;

      return this.parseMongoPlace(result.place);
    } catch (err) {
      throw err;
    }
  }

  async deletePlace(place: SLPlace): Promise<SLDeletePlaceResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { place };
      const url = `${API_ENDPOINT}/project/${place.projectId}/places/delete`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLDeletePlaceResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}
