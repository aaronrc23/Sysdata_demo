import { Component ,Input, Output, EventEmitter} from '@angular/core';
import { Categoria } from 'src/app/mantenimiento/Interface/Categorias';
import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  faChevronRight=faChevronRight;
  faChevronLeft=faChevronLeft;

  @Input() currentPage: number=1;
  @Input() totalPages: number=1;
  @Input() itemsPerPage: number = 10; // Agrega esta línea
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  @Output() rangeInfo: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  // Método para cambiar a la página siguiente
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
 
  
  // Método para cambiar a la página anterior
  prevPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  // Método para cambiar a una página específica
  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChange.emit(pageNumber);
    }
  }

  get totalPagesArray(): number[] {
    // Genera un array con el número de páginas
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

 
 
 
    // Método que maneja el cambio de página
    onPageChange(pageNumber: number): void {
      this.currentPage = pageNumber;
      this.pageChange.emit(pageNumber);
      // ...otras acciones que puedan ser necesarias
    }

    itemsPerPageOptions = [5, 10, 15]; // Puedes agregar más opciones según tus necesidades

    setItemsPerPage(itemsPerPage: number): void {
      this.itemsPerPage = itemsPerPage;
      this.currentPage = 1;
      this.itemsPerPageChange.emit(itemsPerPage);
    }
  
  

}
