import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_ENDPOINT, SESSION_NAME, SESSION_EXPIRY_DAYS, SESSION_SECURE } from 'src/app/constants';
import { CookieService } from 'ngx-cookie-service';

export interface SLUser {
  id: string;
  email: string;
  password: string;
  nickname: string;
  securityQuestion: number;
  securityAnswer: string;
  lastFailedLogin: string;
  lastFeedback: string;
  userSettings: string;
  authenticated: boolean;
}

export interface SLMongoUser {
  _id: string;
  Email: string;
  Password: string;
  Nickname: string;
  Security_Question: number;
  Security_Answer: string;
  Last_Failed_Login: string;
  Last_Feedback: string;
  User_Settings: string;
  Authenticated: boolean;
}

export interface SLGetUserResult {
  success: boolean;
  user?: SLMongoUser;
  error?: any;
}

export interface SLLoginResult {
  success: boolean;
  user?: SLMongoUser;
  error?: any;
}

export interface SLRegisterResult {
  success: boolean;
  error?: any;
}

export interface SLUpdateNicknameResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: SLUser; // The logged in user (if any)

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  /**
   * Refreshes the secure cookie containing the user's data.
   */
  refreshCookie(): void {
    this.cookieService.delete('user')
    this.cookieService.set(SESSION_NAME, JSON.stringify(this.user), SESSION_EXPIRY_DAYS, undefined, undefined, SESSION_SECURE);
  }

  /**
   * @param id User's id
   * @param password User's password
   * 
   * @returns SLUser if successful
   */
  async getUser(id: string, password: string): Promise<SLUser> {
    try {
      const params = { password };
      const result = await this.http.get(`${API_ENDPOINT}/user/${id}`, { params }).toPromise() as SLGetUserResult;

      const user: SLUser = {
        id: result.user._id,
        email: result.user.Email,
        password: result.user.Password,
        nickname: result.user.Nickname,
        securityQuestion: result.user.Security_Question,
        securityAnswer: result.user.Security_Answer,
        lastFailedLogin: result.user.Last_Failed_Login,
        lastFeedback: result.user.Last_Feedback,
        userSettings: result.user.User_Settings,
        authenticated: result.user.Authenticated
      };

      return user;
    } catch (err) {
      throw err;
    }
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
      const result = await this.http.post(`${API_ENDPOINT}/login`, body, { headers }).toPromise() as SLLoginResult;

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
  async register(
    nickname: string,
    email: string,
    password: string,
    securityQuestion: string,
    securityAnswer: string
  ): Promise<SLRegisterResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { nickname, email, password, securityQuestion, securityAnswer };
      const result = await this.http.post(`${API_ENDPOINT}/register`, body, { headers }).toPromise() as SLRegisterResult;

      return result;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param email The user's email
   * @param nickname The updated nickname
   * 
   * @returns Whether the nickname update was successful
   */
  async updateNickname(email: string, nickname: string): Promise<SLUpdateNicknameResult> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { email, nickname };
      const result = await this.http.post(`${API_ENDPOINT}/update/nickname`, body, { headers }).toPromise() as SLUpdateNicknameResult;

      return result;
    } catch (err) {
      throw err;
    }
  }
}
