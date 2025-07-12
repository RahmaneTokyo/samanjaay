import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { map, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    // baseUrl = 'https://samanjaayback-production.up.railway.app/api/';
    // baseUrl = 'https://samanjaay-back.onrender.com/api/';
    baseUrl = 'http://localhost:3000/api/';
    constructor(private http: HttpClient) {}

    getOneUser(userId: number) {
        return this.http.get<User>(`${this.baseUrl}users/${userId}`);
    }

    editUser(id: string, data: any) {
        return this.http.put(`${this.baseUrl}users/${id}`, data);
    }
}
