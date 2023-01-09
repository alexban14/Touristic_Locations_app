import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerErr: string = 'null';
    registerForm: FormGroup;

    constructor(public fb: FormBuilder, private autService: AuthService, private _router: Router) {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });

        this.registerForm.valueChanges.subscribe(console.log);
    }

    ngOnInit(): void {}

    submitRegisterForm() {
        const registerFormValue = this.registerForm.value;
        console.log(registerFormValue);
        this.autService.register(registerFormValue).subscribe({
            next: (res: any) => {
                console.log(res);
                this._router.navigate(['/locations/get']);
            },
            error: (err: any) => {
                this.registerErr = 'Email-ul sau Username-ul este deja inregistrat.';
                console.log(err);
            }
        });
    }
}
