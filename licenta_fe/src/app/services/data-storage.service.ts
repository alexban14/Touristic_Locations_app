import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    logedIn = new BehaviorSubject<boolean>(false);
    currentLogedIn = this.logedIn.asObservable();

    constructor() {}

    changeLogedIn(logedInStatus: boolean) {
        this.logedIn.next(logedInStatus);
    }
}
