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
import { MapquestComponent } from './mapquest/mapquest.component';
import { EventsComponent } from './eventsPage/events.component';
import { ListEventsComponent } from './eventsPage/list-events/list-events.component';
import { CreateEventComponent } from './eventsPage/create-event/create-event.component';
import { EditEventComponent } from './eventsPage/edit-event/edit-event.component';
import { SelectDatesComponent } from './eventsPage/list-events/select-dates/select-dates.component';
import { ShowEventsComponent } from './eventsPage/list-events/show-events/show-events.component';
import { ShowPageEventComponent } from './eventsPage/show-page-event/show-page-event.component';
import { ShowEventsHomeComponent } from './home/show-events-home/show-events-home.component';
import { SearchLocationComponent } from './locations/list-locations/search-location/search-location.component';

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
        FooterComponent,
        MapquestComponent,
        EventsComponent,
        ListEventsComponent,
        CreateEventComponent,
        EditEventComponent,
        SelectDatesComponent,
        ShowEventsComponent,
        ShowPageEventComponent,
        ShowEventsHomeComponent,
        SearchLocationComponent
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
