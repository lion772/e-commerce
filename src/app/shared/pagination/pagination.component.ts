import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../common/product";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() currentPage: number = 0;
  @Input() size: number	= 5;
  @Input() totalElements: number = 100;
  @Input() totalPages: number =	10;
  @Input() products!: Product[];

  @Output() public currentPageChanged = new EventEmitter<number>();

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.currentPageChanged.emit(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.currentPageChanged.emit(this.currentPage);
    }
  }

  public onPageChange(event: any) {
    this.currentPageChanged.emit(+event.target.text);
  }
}
