import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommonService} from './common/common.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../@models';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    private apiURL = environment.apiURL + '/auth';

    private currentUserSubject: BehaviorSubject<User>;
  
    constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser')),
      );
    }
  
    public get user(): User {
      return this.currentUserSubject.value;
    }
  
    login(email, password) {
        return this.http.post<any>(this.apiURL + '/_login', { email, password }, CommonService.HTTP_OPTIONS).pipe(
            map((v:any) => v.result),
            map((res) => {
            const user = res.user;
            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('accessToken', JSON.stringify(user.token));
            this.currentUserSubject.next(user);
            return user;
            }),
        );
    }

    register(body) {
        return this.http.post<any>(this.apiURL + '/_register', body, CommonService.HTTP_OPTIONS).pipe(
            map((v:any) => v.result),
            map((res) => {
            const user = res.user;
            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('accessToken', JSON.stringify(user.token));
            this.currentUserSubject.next(user);
            return user;
            }),
        );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        this.currentUserSubject.next(null);
    }
}