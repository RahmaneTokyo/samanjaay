import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-paginator',
    standalone: true,
    imports: [MatButton, MatIcon],
    templateUrl: './paginator.component.html',
    styles: ``,
})
export class PaginatorComponent {
    page = input.required<number>();
    pages = input.required<number[]>();
    totalPages = input.required<number>();
    pageEvent = output<number>();

    onPrev(): void {
        if (this.page() === 0) {
            return;
        }
        this.pageEvent.emit(this.page() - 1);
    }
    onNext(): void {
        if (this.page() === this.pages().length) {
            return;
        }
        this.pageEvent.emit(this.page() + 1);
    }

    // ngOnChanges(): void {
    //     console.log(this.data);

    //     this.pages = new Array(this.data.totalPages)
    //         .fill(0)
    //         .map((_, i) => i + 1);
    // }

    //   onNext(): void {
    //     this.pageEvent.emit({
    //       pageIndex: this.pageable.number + 1,
    //       pageSize: this.pageable.size,
    //       length: this.pageable.totalElements,
    //     });
    //   }

    //   onPrev(): void {
    //     this.pageEvent.emit({
    //       pageIndex: this.pageable.number - 1,
    //       pageSize: this.pageable.size,
    //       length: this.pageable.totalElements,
    //     });
    //   }

    //   onFirst(): void {
    //     this.pageEvent.emit({
    //       pageIndex: 0,
    //       pageSize: this.pageable.size,
    //       length: this.pageable.totalElements,
    //     });
    //   }

    //   onLast(): void {
    //     this.pageEvent.emit({
    //       pageIndex: this.pageable.totalPages - 1,
    //       pageSize: this.pageable.size,
    //       length: this.pageable.totalElements,
    //     });
    //   }

    //   onChoicePage(index: number): void {
    //     this.pageEvent.emit({
    //       pageIndex: index - 1,
    //       pageSize: this.pageable.size,
    //       length: this.pageable.totalElements,
    //     });
    //   }
}
