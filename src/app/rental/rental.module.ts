import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { MapModule } from '../common/map/map.module';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalComponent } from './rental.component';
import { RentalService } from './shared/rental.service';
import { AuthGuard } from '../auth/shared/auth.guard';
import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { HelperService } from '../common/service/helper.service';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking/shared/booking.service';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';

const routes: Routes = [
    {
        path: 'rentals',
        component: RentalComponent,
        children: [
            {path: '', component: RentalListComponent},
            {path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard]},
            {path: ':rentalId', component: RentalDetailComponent},
            {path: ':city/homes', component: RentalSearchComponent}
        ]
    }
];

@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        RentalDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgPipesModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        MapModule,
        Daterangepicker
    ],
    providers: [
        RentalService,
        HelperService,
        BookingService
    ]
})
export class RentalModule {}