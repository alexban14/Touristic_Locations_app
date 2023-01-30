import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckService } from '../checking/check.service';
import { DataStorageService } from '../data-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isLogedIn!: boolean;

    constructor(private dataService: DataStorageService) {
        this.dataService.currentLogedIn.subscribe({
            next: (response: any) => (this.isLogedIn = response.logedIn),
            error: (err) => console.log(err)
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.isLogedIn === true) {
            return true;
        } else {
            return false;
        }
    }
}
