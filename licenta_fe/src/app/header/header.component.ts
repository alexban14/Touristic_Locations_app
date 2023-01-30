import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { CheckService } from '../services/checking/check.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isLogedIn: boolean | undefined;
    subscription: Subscription | undefined;
    dataServiceSub: Subscription | undefined;
    loginStatusSub: Subscription | undefined;

    constructor(private authService: AuthService, private dataService: DataStorageService, private checkService: CheckService, private _router: Router) {}

    ngOnInit(): void {
        this.loginStatusSub = this.checkService.isLogedIn().subscribe({
            next: (response: any) => {
                this.dataService.changeLogedIn(response),
                    (this.dataServiceSub = this.dataService.currentLogedIn.subscribe({
                        next: (response: any) => {
                            (this.isLogedIn = response.logedIn), console.log(this.isLogedIn);
                        },
                        error: (err) => console.log(err)
                    }));
            },
            error: (err) => console.log(err)
        });
    }

    logoutUser() {
        this.authService.logout().subscribe({
            next: (res: any) => {
                console.log(res);
                this.dataService.changeLogedIn(false);
                if (this._router.url == '/') {
                    window.location.reload();
                } else {
                    this._router.navigate(['/']);
                }
            },
            error: (err) => console.log(err)
        });
    }

    ngOnDestroy(): void {
        this.loginStatusSub?.unsubscribe();
    }
}
