import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/rental/shared/rental.service';
import { Rental } from 'src/app/rental/shared/rental.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  userRentals: Rental[];
  rentalDeleteIndex: number;

  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.rentalService.getUserRental()
      .subscribe((rentals: Rental[]) => {
        this.userRentals = rentals;
      });
  }

  deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId)
      .subscribe(() => {
        this.userRentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
        this.toastr.success('Your rental successfully deleted!', 'Success!');
      }, err => {
        this.toastr.error(err.error.errors[0].details, 'Failed!');
      });
  }

}
