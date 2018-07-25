import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: HttpClient) { }
  userById(id: number) {
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;charset=utf-8',
        'X-CSRF-Token': this.token.csrf_token
      }),
      withCredentials: true,
    };
    
    return this.http.get<any>('http://dev-plantatree.gailabs.com/user/' + id+ '?_format=json', httpOptions)
  }
  register(user: User) {
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;charset=utf-8',
        'X-CSRF-Token': ''
      }),
      withCredentials: true,
    }
    return this.http.post<User>('http://dev-plantatree.gailabs.com/user/register?_format=json', User, httpOptions)
  }
  getToken() {
    return this.http.get('http://dev-plantatree.gailabs.com/rest/session/token', {responseType: 'text'});
  }     
}
