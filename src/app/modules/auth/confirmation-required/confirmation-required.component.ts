import { Component, ViewEncapsulation } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
    selector: 'auth-confirmation-required',
    templateUrl: './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [RouterLink, FormsModule, ReactiveFormsModule],
})
export class AuthConfirmationRequiredComponent {
    error = false;
    loader = false;
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {}

    confirm(value: any) {
        this.loader = true;
        this.authService.confirmReset(value).subscribe(
            (result: any) => {
                console.log(result);
                localStorage.setItem('id', result.id);
                this.loader = false;
                this.router.navigate(['/reset-password']);
            }, (err) => {
                this.error = true;
                this.loader = false;
                this.errorMessage = err.error.message;
            }
        );
    }
}
