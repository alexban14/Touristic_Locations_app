import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListLocationsComponent } from './locations/list-locations/list-locations.component';
import { ShowLocationComponent } from './locations/show-location/show-location.component';
import { CreateLocationComponent } from './locations/create-location/create-location.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';
import { HeaderComponent } from './header/header.component';
import { LocationsComponent } from './locations/locations.component';
import { ReivewsComponent } from './reivews/reivews.component';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import { LocationsEffects } from './locations/store/locations.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
    declarations: [AppComponent, HomeComponent, LocationsComponent, ListLocationsComponent, ShowLocationComponent, CreateLocationComponent, EditLocationComponent, HeaderComponent, ReivewsComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, StoreModule.forRoot(fromApp.appReducer), EffectsModule.forRoot([LocationsEffects]), StoreRouterConnectingModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
