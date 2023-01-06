import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { CheckService } from '../services/checking/check.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean | undefined;
    subscription: Subscription | undefined;
    loginStatusSub: Subscription | undefined;

    constructor(private authService: AuthService, private checkService: CheckService, private _router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.loginStatusSub = this.checkService.isLogedIn().subscribe({
            next: (response) => {
                console.log(response), (this.isLoggedIn = response.logedIn);
            },
            error: (err) => console.log(err)
        });
    }

    logoutUser() {
        this.authService.logout().subscribe({
            next: (res: any) => {
                console.log(res);
            },
            error: (err) => console.log(err)
        });
        if (this._router.url == '/') {
            window.location.reload();
        } else {
            this._router.navigate(['/']);
        }
    }

    ngOnDestroy(): void {
        this.loginStatusSub?.unsubscribe();
    }
}
