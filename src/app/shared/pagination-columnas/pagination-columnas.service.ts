import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationColumnasService <T> {

  itemsPerPage = 10;
  currentPage = 1;
  itemsPerPageOptions = [5, 8, 10];

  // Cambia el tipo de entradas a un arreglo de cualquier tipo T
  entradas: T[] = [];

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  // Cambia la lógica para obtener el total de páginas con base en el nuevo arreglo de entradas
  get totalPages(): number {
    return Math.ceil(this.entradas.length / this.itemsPerPage);
  }

  // Cambia la lógica para obtener categorías paginadas con base en el nuevo arreglo de entradas
  getCategoriasPaginadas(): T[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.entradas.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
