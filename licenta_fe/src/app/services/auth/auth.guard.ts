import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckService } from '../checking/check.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isLogedIn: boolean | undefined;

    constructor(private checkService: CheckService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // if (this.authService.isLoggedIn == true) {
        //     return true;
        // } else {
        //     this._router.navigate(['/auth/register']);
        //     return false;
        // }
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
