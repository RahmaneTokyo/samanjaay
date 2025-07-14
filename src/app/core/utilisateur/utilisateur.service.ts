import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
    baseUrl = 'https://samanjaay-back.onrender.com/api/users/';
    // baseUrl = 'http://localhost:3000/api/users/';

    constructor(private http: HttpClient) { }

    getUtilisateurs(page: number, limit: number) {
        return this.http.get(`${this.baseUrl}utilisateurs?page=${page}&limit=${limit}`);
    }


}
