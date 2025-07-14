import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {VenteService} from "../../core/vente/vente.service";
import {UtilisateurService} from "../../core/utilisateur/utilisateur.service";
import * as XLSX from "xlsx";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {LoaderComponent} from "../../layout/loader/loader.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {VenteDetailComponent} from "../ventes/vente-detail/vente-detail.component";
import {User} from "../../core/user/user.types";
import {data} from "autoprefixer";
import {UserService} from "../../core/user/user.service";

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
    imports: [
        CurrencyPipe,
        DatePipe,
        LoaderComponent,
        NgForOf,
        ReactiveFormsModule,
        VenteDetailComponent,
        FormsModule,
        MatDialogClose,
        NgClass
    ],
  templateUrl: './utilisateurs.component.html',
})
export class UtilisateursComponent implements OnInit {
    @ViewChild('editStatus') myDialog!: TemplateRef<any>;
    private dialogRef: MatDialogRef<any, any>;

    utilisateurs: any[];
    loader = false;

    animationAllowed: boolean = false;

    currentPage = 1;
    limit = 5;
    totalPages: number; // Set this from your API response
    totalPagesArray: number[] = [];
    selectedItem = false;
    utilisateur: any;

    constructor(private dialog: MatDialog, private utilisateurService: UtilisateurService, private userService: UserService,) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loader = true;
        this.utilisateurService.getUtilisateurs(this.currentPage, this.limit).subscribe(
            (result: any) => {
                this.loader = false;
                this.utilisateurs = result.data;
                this.totalPages = result.totalPages;
                console.log(result);
                this.updatePagination();
            }
        );
    }

    updatePagination() {
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.loadData();
    }

    exportToExcel(): void {
        const table = document.getElementById('utilisateurs'); // Replace with your actual table ID
        const worksheet = XLSX.utils.table_to_sheet(table);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        XLSX.writeFile(workbook, 'liste-des-utilisateurs page '+ this.currentPage +'.xlsx');
    }

    confirmEdit(item: any) {
        this.utilisateur = item;

        this.dialogRef = this.dialog.open(this.myDialog, {
            width: '30%',
            hasBackdrop: true,
        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                item.active = !item.active;
                this.animationAllowed = true;
            } else {
                this.animationAllowed = false;
            }
        });
    }

    changeStatus() {
        this.utilisateur.active = !this.utilisateur.active;
        const data = {
            active: this.utilisateur.active,
        }

        this.userService.editUser(this.utilisateur.id, data).subscribe(
            result => {
                this.dialogRef.close();
                this.loadData();
            }
        );
    }
}
