import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { Users } from '../../interfaces/Users';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-pwd-recovery',
    imports: [MatButton, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, FeathericonsModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './pwd-recovery.component.html',
    styleUrl: './pwd-recovery.component.scss'
})
export class PwdRecoveryComponent {
    isError: boolean = false;
    isSuccess: boolean = false;
    user: Users  | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            type: ['', [Validators.required]]
        });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            let recovery = {
                "email": this.authForm.value["email"],
                "type" : this.authForm.value["type"]
            };
            
            this.authService.passwordRecovery(recovery).subscribe((data: boolean) => {
                if(!data == null)
                    this.isError = true;
                else
                {
                    this.isSuccess = true;
                }
            });
            
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

    ngOnInit(): void {
        const token = localStorage.getItem('authToken');
        const isLoggedIn: boolean = localStorage.getItem('isLoggedIn') === 'true';
        if (token) 
            if(isLoggedIn)
                this.router.navigate(['/teachers']);
   }
   

   havePassword(){
        this.router.navigate(['/authentication']);
   }
}