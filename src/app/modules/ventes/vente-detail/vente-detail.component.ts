import {Component, Input} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-vente-detail',
  standalone: true,
    imports: [
        DatePipe,
        CurrencyPipe
    ],
  templateUrl: './vente-detail.component.html'
})
export class VenteDetailComponent {
    @Input() item: any;

    constructor() {
        console.log(this.item);
    }

    generatePDFPreview() {
        const DATA: any = document.getElementById('invoice');

        html2canvas(DATA).then(canvas => {
            const fileWidth = 210;
            const fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');

            const PDF = new jsPDF('p', 'mm', 'a4');
            PDF.addImage(FILEURI, 'PNG', 0, 0, fileWidth, fileHeight);

            // Open the PDF in a new tab as a Blob
            const blob = PDF.output('blob');
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl);
        });
    }

    generatePDF() {
        const DATA: any = document.getElementById('invoice');

        html2canvas(DATA, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            // These are exact A4 page dimensions in mm
            const pdfWidth = 210;
            const pdfHeight = 297;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('facture.pdf');
        });
    }
}
