import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isLoggedIn: boolean;

    constructor(private authService: AuthService) {
        this.isLoggedIn = this.authService.isLoggedIn;
    }

    logoutUser() {
        this.authService.logout().subscribe({
            next: (res: any) => console.log(res),
            error: (err) => console.log(err)
        });
    }

    ngOnInit(): void {}
}
