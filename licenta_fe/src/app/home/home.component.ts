import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { CheckService } from '../services/checking/check.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    dataServiceSub: Subscription | undefined;
    isLogedIn: boolean | undefined;

    constructor(private dataService: DataStorageService) {}

    ngOnInit(): void {
        this.dataServiceSub = this.dataService.currentLogedIn.subscribe({
            next: (response: any) => (this.isLogedIn = response.logedIn),
            error: (err) => console.log(err)
        });
    }

    ngOnDestroy(): void {
        this.dataServiceSub?.unsubscribe();
    }
}
