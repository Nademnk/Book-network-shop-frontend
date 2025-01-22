import { Component, OnInit } from '@angular/core';
import { PageResponsesBorrowedBookResponse, FeedbackRequest, BorrowedBookResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.scss'
})
export class ReturnBookComponent implements OnInit {


  returnedBooks: PageResponsesBorrowedBookResponse = {};

  page = 0;
  size = 5;
message ='';
level= 'success';

  constructor(
    private bookService: BookService,

  ) { }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
      },
    })
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }
  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }
  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  get isLastPage(): boolean {
    return this.page === this.returnedBooks.totalPages as number - 1;
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned){
      this.level ='error';
      this.message = 'Book is not  yet returned';
      return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level='success';
        this.message = 'Book return approved successfully';
        this.findAllReturnedBooks();
      }
    })
  }

}
