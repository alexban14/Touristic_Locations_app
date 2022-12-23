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
    form: FormGroup = new FormGroup({});

    constructor(public fb: FormBuilder, private autService: AuthService, private _router: Router) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: '',
            email: '',
            password: ''
        });
    }

    submitRegisterForm() {
        console.log(this.form);
        const formData = new FormData();
        formData.append('username', this.form.get('username')!.value);
        formData.append('email', this.form.get('email')!.value);
        formData.append('password', this.form.get('password')!.value);
        console.log(formData);
    }

    // registerUser() {
    //     console.log(this.registerUserData);
    //     this.autService.register(this.registerUserData).subscribe({
    //         next: (res: any) => {
    //             console.log(res);
    //             this._router.navigate(['/locations/get']);
    //         },
    //         error: (err: any) => console.log(err)
    //     });
    // }
}
