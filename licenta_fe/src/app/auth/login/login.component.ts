import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginUserData = {
        username: '',
        password: ''
    };

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private _router: Router) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });

        this.loginForm.valueChanges.subscribe(console.log);
    }

    submitLoginForm() {
        const loginFormValue = this.loginForm.value;
        this.authService.login(loginFormValue).subscribe({
            next: (res: any) => {
                console.log(res);
                this._router.navigate(['/locations/get']);
            },
            error: (err: any) => console.log(err)
        });
    }

    ngOnInit(): void {}
}
