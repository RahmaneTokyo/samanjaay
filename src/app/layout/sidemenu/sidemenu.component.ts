import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../core/user/user.service";
import {jwtDecode} from "jwt-decode";
import {User} from "../../core/user/user.types";
import {AuthService} from "../../core/auth/auth.service";
import {MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-sidemenu',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        MatDialogClose,
        NgClass,
        NgForOf,
    ],
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent implements OnInit {
    @ViewChild('logout') myDialog!: TemplateRef<any>;
    user: User;
    role: string;
    themes: string;
    private dialogRef: MatDialogRef<any, any>;

    /* calendar */
    days = [];

    constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog) {}

    ngOnInit() {
        /* Get connected user infos */
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(localStorage.getItem('accessToken'));
            this.role = decoded.role;
            this.getUserInfos(+decoded.id);
        }

        /* Theme */
        this.themes = document.documentElement.classList.value;

        /* Calendar */
        const today = new Date();
        this.days = [-1, 0, 1].map(offset => {
            const date = new Date(today);
            date.setDate(today.getDate() + offset);

            return {
                label: date.toLocaleDateString('fr-FR', { weekday: 'short' }), // e.g. "lun", "mar"
                day: date.getDate(),
                isToday: offset === 0
            };
        });
    }

    toggleDarkMode() {
        const html = document.documentElement;
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        this.themes = document.documentElement.classList.value;
    }

    getUserInfos(id: number) {
        this.userService.getOneUser(id).subscribe(
            data => {
                this.user = data;
            }
        );
    }

    signOut() {
        this.dialogRef.close();
        return this.authService.signOut();
    }

    confirmLogout() {
        this.dialogRef = this.dialog.open(this.myDialog, {
            width: '30%',
            hasBackdrop: true,
        })
    }
}
