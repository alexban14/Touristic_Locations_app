import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateLocationComponent } from './locations/create-location/create-location.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';
import { ListLocationsComponent } from './locations/list-locations/list-locations.component';
import { LocationsComponent } from './locations/locations.component';
import { ShowLocationComponent } from './locations/show-location/show-location.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'locations',
        component: LocationsComponent,
        children: [
            {
                path: 'get',
                component: ListLocationsComponent
            },
            {
                path: 'new',
                component: CreateLocationComponent
            },
            {
                path: 'get/:id',
                component: ShowLocationComponent
            },
            {
                path: 'get/:id/edit',
                component: EditLocationComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
