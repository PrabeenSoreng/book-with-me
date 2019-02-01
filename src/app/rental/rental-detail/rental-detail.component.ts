import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
  rental: Rental;

  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // const rentalId: string = this.route.snapshot.params.get("rentalId");
    this.route.params
      .subscribe(params => {
        this.getRental(params['rentalId']);        
      });
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId)
      .subscribe((rental: Rental) => {
        this.rental = rental;
      })
  }
}
