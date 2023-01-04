import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CreateLocationComponent } from './locations/create-location/create-location.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';
import { ListLocationsComponent } from './locations/list-locations/list-locations.component';
import { LocationsComponent } from './locations/locations.component';
import { ShowLocationComponent } from './locations/show-location/show-location.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth/auth.guard';

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
                component: CreateLocationComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'get/:id',
                component: ShowLocationComponent
            },
            {
                path: 'get/:id/edit',
                component: EditLocationComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'logout',
                redirectTo: ''
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
