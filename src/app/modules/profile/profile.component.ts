import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LoaderComponent} from "../../layout/loader/loader.component";
import {jwtDecode} from "jwt-decode";
import {UserService} from "../../core/user/user.service";
import {MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [
        LoaderComponent,
        MatDialogClose,
        FormsModule
    ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    @ViewChild('editInfos') myDialog!: TemplateRef<any>;
    user: any;
    type: string;
    prenom: string;
    nom: string;
    email: string;
    loader = false;
    private dialogRef: MatDialogRef<any, any>;
    error = false;

    constructor(private userService: UserService, private dialog: MatDialog, private authService: AuthService) {}

    ngOnInit() {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(localStorage.getItem('accessToken'));
            this.getUserInfos(+decoded.sub);
        }
    }

    getUserInfos(id: number) {
        this.userService.getOneUser(id).subscribe(
            data => {
                this.user = data;
            }
        );
    }

    editInfo(motif: string) {
        this.prenom = this.user.prenom;
        this.nom = this.user.nom;
        this.email = this.user.email;
        this.type = motif;
        this.dialogRef = this.dialog.open(this.myDialog, {
            width: '60%',
            hasBackdrop: true,
        })
    }

    edituser() {
        this.loader = true;
        const data = {
            prenom: this.prenom,
            nom: this.nom,
        }

        this.userService.editUser(this.user.id, data).subscribe(
            result => {
                this.loader = false;
                this.dialogRef.close();
            }
        );
        this.dialogRef.afterClosed().subscribe(result =>
            {
                this.ngOnInit();
            }
        )
    }

    editPassword(value: any) {
        this.loader = true;
        const credentials = {
            email: this.user.email,
            password: value.prev ,
        }

        this.authService.signIn(credentials).subscribe(
            result => {
                console.log(result);
                const data = {
                    password: value.new
                }
                this.userService.editUser(this.user.id, data).subscribe(
                    result => {
                        alert('Modification de votre mot de passe réussie! ' +
                            'Vous allez être déconnecté(e)');
                        this.authService.signOut();
                        this.dialogRef.close();
                        this.loader = false;
                    }
                )
            }, error => {
                if (error.status === 401) {
                    this.loader = false;
                    this.error = true;
                }
            }
        )

        console.log(credentials)
    }
}
