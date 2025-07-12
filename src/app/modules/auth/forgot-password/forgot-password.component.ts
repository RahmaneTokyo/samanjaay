import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {Router, RouterLink} from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ],
})
export class AuthForgotPasswordComponent {
    loader = false;
    error = false;
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {
    }

    reset(value: any) {
        this.loader = true;
        this.authService.requestReset(value).subscribe(
            (res: any) => {
                console.log(res);
                this.router.navigate(['/confirmation-required']);
            }, (err) => {
                if (err.status === 404) {
                    this.loader = false;
                    this.error = true;
                    this.errorMessage = 'Cet email n\'existe pas';
                }
                console.log(err.status);
            }
        )
    }
}
