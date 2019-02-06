import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalComponent } from './rental.component';
import { RentalService } from './shared/rental.service';

const routes: Routes = [
    {
        path: 'rentals',
        component: RentalComponent,
        children: [
            {path: '', component: RentalListComponent},
            {path: ':rentalId', component: RentalDetailComponent}
        ]
    }
];

@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent
    ],
    imports: [
        CommonModule,
        NgPipesModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        RentalService
    ]
})
export class RentalModule {}