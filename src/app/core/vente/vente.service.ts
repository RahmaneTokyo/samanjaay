import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ParamsType} from "../../shared/models/params.model";
import {PageResponse} from "../../shared/models/page.response";

@Injectable({
  providedIn: 'root'
})
export class VenteService {
    baseUrl = 'https://samanjaayback-production.up.railway.app/api/factures';
    // baseUrl = 'https://samanjaay-back.onrender.com/api/factures';
    // baseUrl = 'http://localhost:3000/api/factures';

    constructor(private http: HttpClient) { }

    addVente(data: any) {
        return this.http.post(this.baseUrl, data);
    }

    getVentesOfMe(page: number, limit: number) {
        return this.http.get(`${this.baseUrl}/me?page=${page}&limit=${limit}`);
    }

    getStats() {
        return this.http.get(`${this.baseUrl}/stats/sales`);
    }

    getWeeklyVentesOfMe() {
        return this.http.get(`${this.baseUrl}/charts`);
    }

    getLastSales() {
        return this.http.get(`${this.baseUrl}/last`);
    }
}
