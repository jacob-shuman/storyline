import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT } from 'src/app/constants';

export interface SLLoginResult {
  success: boolean;
  error?: any;
}

export interface SLRegisterResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any; // The logged in user (if any)

  constructor(private http: HttpClient) {
  }

  /**
   * @param email User's email
   * @param password User's password
   * 
   * @returns Whether login was successful
   */
  async login(email: string, password: string): Promise<SLLoginResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { email, password, };
      const result: SLLoginResult = await this.http.post(`${API_ENDPOINT}/login`, body, { headers }).toPromise() as SLLoginResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param nickname How the user is to be referred to.
   * @param email The user's email
   * @param password The user's password
   * @param securityQuestion The secure question that the user will enter if verification is necessary
   * @param securityAnswer The answer to the secure question
   * 
   * @returns Whether registration was successful
   */
  async register(nickname: string, email: string, password: string, securityQuestion: string, securityAnswer: string): Promise<SLRegisterResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { nickname, email, password, securityQuestion, securityAnswer };
      const result: SLRegisterResult = await this.http.post(`${API_ENDPOINT}/register`, body, { headers }).toPromise() as SLRegisterResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}
