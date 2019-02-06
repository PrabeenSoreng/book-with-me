import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Rental } from "./rental.model";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class RentalService {

    constructor(private http: HttpClient) {}

    getRentalById(rentalId: string) {
        return this.http.get(`/api/v1/rentals/${rentalId}`);
    }

    getRentals() {
        return this.http.get('/api/v1/rentals');
    }
}