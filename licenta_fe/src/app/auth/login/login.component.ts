import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginErr: string = 'null';

    loginUserData = {
        username: '',
        password: ''
    };

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private dataService: DataStorageService, private _router: Router) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });

        this.loginForm.valueChanges.subscribe(console.log);
    }

    submitLoginForm() {
        const loginFormValue = this.loginForm.value;
        this.authService.login(loginFormValue).subscribe({
            next: (res: any) => {
                console.log(res);
                this.dataService.changeLogedIn(true);
                this._router.navigate(['/']);
            },
            error: (err: any) => {
                this.loginErr = 'Credentiale incorecte, parola sau username gresit.';
                console.log(err);
            }
        });
    }

    ngOnInit(): void {}
}
