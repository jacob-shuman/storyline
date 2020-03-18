import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_ENDPOINT } from 'src/app/constants';

import { AuthService } from '../auth/auth.service';

export interface SLCharacter {
  id: string;
  name: string;
  description?: string;
  projectId: string;
}

export interface SLMongoCharacter {
  _id: string;
  Name: string;
  Description: string;
  Project_ID: string;
}

export interface SLCreateCharacterResult {
  success: boolean;
  error?: any;
}

export interface SLGetCharacterByIdResult {
  success: boolean;
  error?: any;
}

export interface SLUpdateCharacterResult {
  success: boolean;
  character: SLMongoCharacter;
  error?: any;
}

export interface SLGetAllCharactersResult {
  characters: SLMongoCharacter[];
  success: boolean;
  error?: any;
}

export interface SLDeleteCharacterResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characters: SLCharacter[];

  constructor(private authService: AuthService, private http: HttpClient) { }

  /**
   * @param character A character directly from mongo
   *
   * @returns The same character in a cleaner/consistent format
   */
  private parseMongoCharacter(character: SLMongoCharacter): SLCharacter {
    return {
      id: character._id,
      name: character.Name,
      description: character.Description,
      projectId: character.Project_ID
    } as SLCharacter;
  }

  /**
   * @param projectId The project to create the character on
   * @param character The character details
   *
   * @returns Whether character creation was successful
   */
  async createCharacter(character: SLCharacter): Promise<SLCreateCharacterResult> {
    try {
      if (!character.projectId) {
        throw Error('"projectId" missing on character');
      }

      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { character };
      const url = `${API_ENDPOINT}/project/${character.projectId}/characters/create`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLCreateCharacterResult;

      if (!result.success || result.error) {
        throw Error(result.error);
      }

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getCharacterById(projectId: string, characterId: string): Promise<SLCharacter> {
    if (!this.characters || this.characters.length < 1) {
      await this.getCharacters(projectId);
    }

    const character = this.characters.find(char => char.id === characterId);

    if (!character) {
      throw Error(`No character with ID of ${characterId}`);
    }

    return character;
  }

  async getCharacters(projectId: string, forceUpdate: boolean = false): Promise<SLCharacter[]> {
    if (!this.characters || forceUpdate) {
      try {
        const params = { password: this.authService.user.password };
        const url = `${API_ENDPOINT}/project/${projectId}/characters`;
        const result = await this.http.get(url, { params }).toPromise() as SLGetAllCharactersResult;

        this.characters = result.characters.map(this.parseMongoCharacter);
      } catch (err) {
        throw err;
      }
    }

    return this.characters;
  }

  async updateCharacter(character: SLCharacter): Promise<SLCharacter> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { character };
      const url = `${API_ENDPOINT}/project/${character.projectId}/characters/update`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLUpdateCharacterResult;

      return this.parseMongoCharacter(result.character);
    } catch (err) {
      throw err;
    }
  }

  async deleteCharacter(character: SLCharacter): Promise<SLDeleteCharacterResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { character };
      const url = `${API_ENDPOINT}/project/${character.projectId}/characters/delete`;

      const result = await this.http.post(url, body, { headers }).toPromise() as SLDeleteCharacterResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}
