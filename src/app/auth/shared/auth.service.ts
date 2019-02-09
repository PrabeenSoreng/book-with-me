import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

const jwt = new JwtHelperService();

class DecodedToken {
    exp: number = 0;
    username: string = '';
}

@Injectable()
export class AuthService {
    private decodedToken;
    private expirationDate;
    private isExpired;

    constructor(private http: HttpClient) {
        this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
    }
    
    private saveToken(token) {
        this.decodedToken = jwt.decodeToken(token);
        // this.expirationDate = jwt.getTokenExpirationDate(token);
        // this.isExpired = jwt.isTokenExpired(token);
        
        localStorage.setItem('bwm_auth', token);
        localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
        return token;
    }

    register(userData) {
        return this.http.post('/api/v1/users/register', userData);
    }
    
    login(userData) {
        return this.http.post('/api/v1/users/auth', userData).pipe(
            map(token => this.saveToken(token))
        );
    }

    isAuthenticated() {
        return moment().isBefore(moment.unix(this.decodedToken.exp));
    }

    getAuthToken() {
        return localStorage.getItem('bwm_auth');
    }

    getUsername() {
        return this.decodedToken.username;
    }

    logout() {
        localStorage.removeItem('bwm_auth');
        localStorage.removeItem('bwm_meta');
        this.decodedToken = new DecodedToken();
    }
}