import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheckService } from './checking/check.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    logedIn = new BehaviorSubject<boolean>(false);
    currentLogedIn = this.logedIn.asObservable();

    private locationAuthor = new BehaviorSubject<boolean>(false);
    currentLocationAuthor = this.locationAuthor.asObservable();

    constructor(private checkService: CheckService) {}

    changeLogedIn(logedInStatus: boolean) {
        this.logedIn.next(logedInStatus);
    }

    changeLocationAuthor(locationAuthorStatus: boolean) {
        this.locationAuthor.next(locationAuthorStatus);
    }
}
