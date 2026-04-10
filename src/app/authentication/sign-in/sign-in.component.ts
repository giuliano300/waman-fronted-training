import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { Login } from '../../interfaces/Login';
import { Users } from '../../interfaces/Users';
import { UsersService } from '../../services/Users.service';
import { UtilsService } from '../../utils.service';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sign-in',
    imports: [MatButton, MatIconButton, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, FeathericonsModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    isError: boolean = false;
    user: Users  | null = null;

    constructor(
        private usersService: UsersService, 
        private fb: FormBuilder,
        private router: Router,
        private utilsService: UtilsService,
        private authService: AuthService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            let login:Login = {
                "email": this.authForm.value["email"],
                "pwd" : this.authForm.value["password"]
            };
            
            this.usersService.login(login).subscribe((data: Users) => {
                if(data == null)
                    this.isError = true;
                else
                {
                    this.user! = data;
                    localStorage.setItem('isLoggedIn', "true");
                    localStorage.setItem('loginName', this.user!.name + " " + this.user!.lastName);
                    this.authService.setIsLoggedIn(true);
                    this.authService.setLoginName(this.user!.name + " " + this.user!.lastName);
                    localStorage.setItem('authToken', this.utilsService.generateToken());
                    localStorage.setItem('user', JSON.stringify(this.user!));
                    this.router.navigate(['/teachers']);
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
   

   passwordRecovery(){
        this.router.navigate(['/authentication/forgot-password']);
   }
}