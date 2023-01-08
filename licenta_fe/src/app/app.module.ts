import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListLocationsComponent } from './locations/list-locations/list-locations.component';
import { ShowLocationComponent } from './locations/show-location/show-location.component';
import { CreateLocationComponent } from './locations/create-location/create-location.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';
import { HeaderComponent } from './header/header.component';
import { LocationsComponent } from './locations/locations.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShowLocationsComponent } from './home/show-locations/show-locations.component';
import { FooterComponent } from './home/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LocationsComponent,
        ListLocationsComponent,
        ShowLocationComponent,
        CreateLocationComponent,
        EditLocationComponent,
        HeaderComponent,
        RegisterComponent,
        LoginComponent,
        NotFoundComponent,
        ShowLocationsComponent,
        FooterComponent
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
