import {Component, OnInit, Output} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AddVenteComponent} from "./add-vente/add-vente.component";
import {VenteService} from "../../core/vente/vente.service";
import {PageResponse} from "../../shared/models/page.response";
import {Observable} from "rxjs";
import {LoaderComponent} from "../../layout/loader/loader.component";
import {FormsModule} from "@angular/forms";
import * as XLSX from "xlsx";
import {VenteDetailComponent} from "./vente-detail/vente-detail.component";

@Component({
  selector: 'app-ventes',
  standalone: true,
    imports: [
        NgClass,
        NgForOf,
        DatePipe,
        LoaderComponent,
        FormsModule,
        CurrencyPipe,
        VenteDetailComponent,
    ],
  templateUrl: './ventes.component.html'
})
export class VentesComponent implements OnInit {
    ventes: any[];
    loader = false;

    currentPage = 1;
    limit = 5;
    totalPages: number; // Set this from your API response
    totalPagesArray: number[] = [];
    selectedItem = false;
    vente: any;

    constructor(private dialog: MatDialog, private venteService: VenteService) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loader = true;
        this.venteService.getVentesOfMe(this.currentPage, this.limit).subscribe(
            (result: any) => {
                this.loader = false;
                this.ventes = result.data;
                this.totalPages = result.totalPages;
                console.log(result);
                this.updatePagination();
            }
        );
    }

    addVente() {
        const dialogRef = this.dialog.open(AddVenteComponent, {
            width: '80%',
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.loadData();
        });
    }

    updatePagination() {
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.loadData();
        console.log('go to current page') // Call your NestJS paginated endpoint
    }

    exportToExcel(): void {
        const table = document.getElementById('ventes'); // Replace with your actual table ID
        const worksheet = XLSX.utils.table_to_sheet(table);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        XLSX.writeFile(workbook, 'liste-des-ventes page '+ this.currentPage +'.xlsx');
    }

    /*infos(item: any) {
        console.log(item);
        this.selectedItem = true;
        this.vente = item;
    }*/
}
