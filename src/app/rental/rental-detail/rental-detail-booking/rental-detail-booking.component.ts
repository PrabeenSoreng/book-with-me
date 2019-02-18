import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/booking/shared/booking.model';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { HelperService } from 'src/app/common/service/helper.service';

import { Rental } from '../../shared/rental.model';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent) private picker: DaterangePickerComponent;

  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  options: any = {
      locale: { format: Booking.BOOKING_DATE_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      autoUpdateInput: false,
      isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(
    private helperService: HelperService,
    private bookingService: BookingService,
    public auth: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDays();
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helperService.formatBookingDate(date)) ||
              date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDays() {
    const bookings: Booking[] = this.rental.bookings;

    if(bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helperService.getBookingRangeofDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  addNewBookedOutDates(bookingData: any) {
    const dateRange = this.helperService.getBookingRangeofDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createdBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking)
      .subscribe((bookingData: any) => {
        this.addNewBookedOutDates(bookingData)
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking successfully created, check your booking detail in manage section.', 'Success!');
      }, (err: any) => {
        this.errors = err.error.errors;
      });
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
    this.newBooking.endAt = this.helperService.formatBookingDate(value.end);
    this.newBooking.days = value.end.diff(value.start, 'days');
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }

}
