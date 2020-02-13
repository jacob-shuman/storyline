import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface LoginResult {
  success: boolean;
  error?: any;
}

interface RegisterResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any; // The logged in user (if any)

  private host: string;
  private port: number;

  private root: string;

  constructor(private http: HttpClient) {
    this.host = "https://prj666.mystudentlab.ca";
    this.port = 6914;

    this.root = `${this.host}:${this.port}`;
  }

  /**
   * @param email User's email
   * @param password User's password
   * 
   * @returns Whether login was successful
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { email, password, };
      const result: LoginResult = await this.http.post(`${this.root}/login`, body, { headers }).toPromise() as LoginResult;

      return result.success;
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
  async register(nickname: string, email: string, password: string, securityQuestion: string, securityAnswer: string): Promise<boolean> {
    try {
      console.log("Attempting register");

      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { nickname, email, password, securityQuestion, securityAnswer };
      const result: RegisterResult = await this.http.post(`${this.root}/register`, body, { headers }).toPromise() as RegisterResult;

      console.log("Result: ", result)

      return result.success;
    } catch (err) {
      throw err;
    }
  }
}
