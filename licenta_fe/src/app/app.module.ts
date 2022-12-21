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
import { ReivewsComponent } from './locations/reivews/reivews.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, LocationsComponent, ListLocationsComponent, ShowLocationComponent, CreateLocationComponent, EditLocationComponent, HeaderComponent, ReivewsComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
