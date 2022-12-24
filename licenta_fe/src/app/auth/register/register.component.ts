import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(public fb: FormBuilder, private autService: AuthService, private _router: Router) {
        this.registerForm = this.fb.group({
            username: '',
            email: '',
            password: ''
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
            error: (err: any) => console.log(err)
        });
    }
}

// const formData = new FormData();
// formData.append('username', this.registerForm.get('username')!.value);
// formData.append('email', this.registerForm.get('email')!.value);
// formData.append('password', this.registerForm.get('password')!.value);
// console.log(formData);
// const FormValues = this.registerForm.valueChanges;
// console.log(FormValues);
