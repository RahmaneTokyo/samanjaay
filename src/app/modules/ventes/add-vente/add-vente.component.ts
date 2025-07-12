import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {VenteService} from "../../../core/vente/vente.service";

@Component({
  selector: 'app-add-vente',
  standalone: true,
    imports: [
        MatDialogClose,
        FormsModule,
    ],
  templateUrl: './add-vente.component.html',
})
export class AddVenteComponent {
    @Output() formCompleted = new EventEmitter<void>();
    loader = false;

    constructor(private venteService: VenteService, private dialogRef: MatDialogRef<AddVenteComponent>) { }

    addVente(value: any) {
        this.loader = true;
        console.log(value);
        this.venteService.addVente(value).subscribe(
            result => {
                this.loader = false;
                this.formCompleted.emit();
                this.dialogRef.close(result);

            }, error => {
                this.loader = false;
                console.log(error.error.message);
            }
        );
    }


}
