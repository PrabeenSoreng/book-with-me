import { Component, OnInit } from '@angular/core';

import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {
  formData: Rental;
  shared = false;
  categories = Rental.CATEGORIES;
  errors: any[] = [];

  constructor(
    private router: Router,
    private rentalService: RentalService) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.rentalService.createRental(formData)
      .subscribe((rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      }, err => this.errors = err.error.errors);
  }

}
