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

const routes: Routes = [
    {
        path: 'rentals',
        component: RentalComponent,
        children: [
            {path: '', component: RentalListComponent},
            {path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        RentalDetailBookingComponent
    ],
    imports: [
        CommonModule,
        NgPipesModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        MapModule,
        Daterangepicker
    ],
    providers: [
        RentalService
    ]
})
export class RentalModule {}