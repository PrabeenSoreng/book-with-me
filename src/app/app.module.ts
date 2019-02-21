import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/shared/auth.guard';
import { AuthService } from './auth/shared/auth.service';
import { HeaderComponent } from './common/header/header.component';
import { RentalModule } from './rental/rental.module';
import { ManageModule } from './manage/manage.module';

const routes: Routes = [
  {path: '', redirectTo: '/rentals', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    RentalModule,
    ManageModule,
    AuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
