import { Component, OnInit } from '@angular/core';
import { PageResponsesBookResponse } from '../../../../services/models/page-responses-book-response';
import { BookService } from '../../../../services/services/book.service';
import { Router } from '@angular/router';
import { BookResponse } from '../../../../services/models/book-response';

@Component({
  selector: 'app-create-books',
  templateUrl: './create-books.component.html',
  styleUrl: './create-books.component.scss'
})
export class CreateBooksComponent implements OnInit {
  bookResponse: PageResponsesBookResponse = {};
  page = 0;
  size = 5;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
    
  }


  private findAllBooks(): void {
    this.bookService.findAllBooksByOwner(
      {

        page: this.page,
        size: this.size

      }).subscribe({
        next: (books) => {
          this.bookResponse = books;
        }
      });

  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }
  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }
  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page === this.bookResponse.totalPages as number - 1;
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
  }
  shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus({
      'book-id': book.id as number,
    }).subscribe({
      next:() => {
        book.shareable = !book.shareable;
      },
    });
  }
  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number,
    }).subscribe({
      next:() => {
        book.archived = !book.archived;
      },
    });
  }



}
