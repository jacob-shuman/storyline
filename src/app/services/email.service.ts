import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { API_ENDPOINT } from '../constants';

export interface SLSendFeedbackResult {
  success: boolean;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  /**
   * @param id ID of the user sending feedback
   * @param feedback User feedback on the application
   * 
   * @returns Whether the feedback email was sent successfully
   */
  public async sendFeedback(id: string, feedback: string): Promise<boolean> {
    try {
      const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
      const body = { id, feedback };
      const result = await this.http.post(`${API_ENDPOINT}/feedback`, body, { headers }).toPromise() as SLSendFeedbackResult;

      return result.success;
    } catch (err) {
      throw err;
    }
  }
}
