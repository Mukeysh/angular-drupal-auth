import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;charset=utf-8',
      }),
      withCredentials: true,
    };
    let data = JSON.stringify({name: username, pass: password});
    return this.http.post<any>('http://dev-plantatree.gailabs.com/user/login?_format=json',data)
      .pipe(map(user=>{
        console.log(user.message);
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user)
        }
        return user;
      }));
  }
  logout() {
    return this.http.post
    localStorage.removeItem('currentUser');
  }
}
