import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    constructor(private authService: AuthService, private _router: Router) {}

    ngOnInit(): void {}

    logoutUser() {
        this.authService.logout().subscribe({
            next: (res: any) => console.log(res),
            error: (err) => console.log(err)
        });
        this._router.navigate(['/']);
    }
}
