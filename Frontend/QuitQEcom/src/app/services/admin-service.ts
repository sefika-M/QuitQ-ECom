import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:9090/admin';

  constructor(private http: HttpClient) {}

  getAdminSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/report-summary`);
  }
}
