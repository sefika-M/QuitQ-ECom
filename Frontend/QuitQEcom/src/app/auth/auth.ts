import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  role: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

private baseUrl = 'http://localhost:9090/user';

  constructor(private http: HttpClient, private router: Router){}

  login(email: string, password: string): Observable<LoginResponse> {
return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {
      email,
      password
    });  }

 register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }


  logout(): void {
    localStorage.clear();
  this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  getToken(): string | null {
  return localStorage.getItem('token');
}


  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
