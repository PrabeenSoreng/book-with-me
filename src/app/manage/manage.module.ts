import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageComponent } from './manage.component';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { NgPipesModule } from 'ngx-pipes';
import { FormatDatePipe } from '../common/pipes/format-dates.pipe';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';

const routes: Routes = [
    {
        path: 'manage',
        component: ManageComponent,
        children: [
            {path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard]},
            {path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard]}
        ]
    }
]

@NgModule({
    declarations: [
        ManageComponent,
        ManageRentalComponent,
        ManageBookingComponent,
        FormatDatePipe,
        ManageRentalBookingComponent
    ],
    imports: [
        CommonModule,
        NgPipesModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        RentalService,
        BookingService
    ]
})
export class ManageModule {}