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

    getRentalsByCity(city: string) {
        return this.http.get(`/api/v1/rentals?city=${city}`);
    }

    createRental(rental: Rental) {
        return this.http.post('/api/v1/rentals', rental);
    }

    getUserRental() {
        return this.http.get('api/v1/rentals/manage');
    }

    deleteRental(rentalId: string) {
        return this.http.delete(`api/v1/rentals/${rentalId}`);
    }
}