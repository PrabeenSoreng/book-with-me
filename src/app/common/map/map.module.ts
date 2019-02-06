import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CamelizePipe } from 'ngx-pipes';

import { MapComponent } from './map.component';
import { MapService } from './map.service';


@NgModule({
    declarations: [
        MapComponent
    ],
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBb8iDQzvHz0wOu3-A9NqXX32Uq4gne7Tg'
        })
    ],
    providers: [
        MapService,
        CamelizePipe
    ],
    exports: [MapComponent]
})
export class MapModule {

}