import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckService } from '../checking/check.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isLogedIn: boolean | undefined;

    constructor(private checkService: CheckService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.checkService.isLogedIn().subscribe({
            next: (response) => {
                console.log(response), (this.isLogedIn = response.logedIn);
            }
        });

        if (this.isLogedIn === true) {
            return true;
        } else {
            return false;
        }
    }
}
