import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { CheckService } from '../services/checking/check.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    loginStatusSub: Subscription | undefined;
    isLoggedIn: boolean | undefined;

    constructor(private authService: AuthService, private checkService: CheckService) {}

    logoutUser() {
        this.authService.logout().subscribe({
            next: (res: any) => console.log(res),
            error: (err) => console.log(err)
        });
        window.location.reload();
    }

    ngOnInit(): void {
        this.loginStatusSub = this.checkService.isLogedIn().subscribe({
            next: (res: any) => {
                console.log(res), (this.isLoggedIn = res.logedIn);
            },
            error: (err) => console.log(err)
        });
    }

    ngOnDestroy(): void {
        this.loginStatusSub?.unsubscribe();
    }
}
