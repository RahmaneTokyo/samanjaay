import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {CurrencyPipe, DatePipe, DecimalPipe} from "@angular/common";
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexYAxis,
    NgApexchartsModule
} from "ng-apexcharts";
import * as XLSX from 'xlsx';
import {VenteService} from "../../core/vente/vente.service";
import {LoaderComponent} from "../../layout/loader/loader.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        RouterLink,
        NgApexchartsModule,
        CurrencyPipe,
        DatePipe,
        LoaderComponent
    ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    stats: any;
    days: any;
    ventes: any;

    public chartOptions: Partial<{
        series: ApexAxisChartSeries;
        chart: ApexChart;
        xaxis: ApexXAxis;
        colors: string[];
        yaxis: ApexYAxis;
    }>;

    constructor(private venteService: VenteService) {}

    ngOnInit() {
        this.getStats();
        this.getLastSales();
        this.getWeeklySales();
    }

    getStats() {
        this.venteService.getStats().subscribe(
            data => {
                this.stats = data;
                console.log(this.stats)
            }
        );
    }

    getLastSales() {
        this.venteService.getLastSales().subscribe(
            data => {
                this.ventes = data;
            }
        );
    }

    /* Max value yaxis */
    getMaxYValue(series: number[]): number {
        const allZero = series.every(val => val === 0);
        if (allZero) return 500000;

        const maxVal = Math.max(...series);
        return maxVal + 500000;
    }
    /* Max value yaxis */

    getWeeklySales() {
        this.venteService.getWeeklyVentesOfMe().subscribe(
            data => {
                this.days = data;
                this.chartOptions = {
                    series: [
                        {
                            name: "Recette",
                            data: this.days.map(d => d.somme),
                        }
                    ],
                    chart: {
                        height: 300,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                    },
                    colors: ['#4f46e5'],
                    yaxis: {
                        min: 0, // Starting point of the axis
                        max: this.getMaxYValue(this.days.map(d => d.somme)), // End point of the axis
                        tickAmount: 5, // Number of ticks/labels between min and max
                        labels: {
                            formatter: (val) => {
                                if (val >= 1000000) {
                                    return `${val / 1000000}M`; // Format values in millions
                                } else {
                                    return `${val / 1000}k`; // Format values in thousands
                                }
                            }
                        }
                    },
                    xaxis: {
                        categories: this.days.map(d => d.day) // ➜ ['lundi', 'mardi', ...]
                    }
                }
            }
        )
    }

    exportToExcel(): void {
        const table = document.getElementById('last-vente'); // Replace with your actual table ID
        const worksheet = XLSX.utils.table_to_sheet(table);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        XLSX.writeFile(workbook, 'dernieres-ventes.xlsx');
    }
}
