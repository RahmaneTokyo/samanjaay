import {Component, inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {of} from "rxjs";

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        RouterLink,
    ],
})
export class AuthSignInComponent implements OnInit {
    loader = false;
    error = false;
    errMessage: string;

    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit() {}

    login(value: any) {
        this.loader = true;
        console.log(value);
        this.authService.signIn(value).subscribe(
            result => {
                this.loader = false;
                this.router.navigate(['/home']);
            }, err => {
                this.loader = false;
                this.error = true
                if (err.status === 401) {
                    this.errMessage = 'Identifiants incorrects';
                }
            }
        );
    }
}
