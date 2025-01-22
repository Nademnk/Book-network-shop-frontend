import { Component, OnInit } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { BookService } from '../../../../services/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {

  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };
  errorMsg: string[] = [];
  selectedPicture: string | null = null;
  selectedBookCover: File | null = null;
  loading: boolean = false;
  isDarkMode: boolean = false;

  constructor(private bookService: BookService, private router: Router, private activatedRoute: ActivatedRoute) {
    // Initialize theme preference
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme || 'light');
  }
  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findBookById({
           'book-id': bookId
      }).subscribe({
        next:(book) => {
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          }
          if (book.cover ) {
            this.selectedPicture = 'data:image/jpg;base64,'+ book.cover;
          }
        }
      });
    }
  }

  /**
   * Toggles the theme between dark and light modes.
   */
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  /**
   * Handles file selection and validates the image file.
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.errorMsg = ['Invalid file type. Please select an image.'];
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMsg = ['File size exceeds the limit of 5MB.'];
        return;
      }

      this.selectedBookCover = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Clears the selected image and resets the file input.
   */
  cancelSelection(): void {
    this.selectedBookCover = null;
    this.selectedPicture = null;

    const fileInput = document.getElementById('formFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  /**
   * Validates and saves the book details.
   */
  saveBook(): void {
    this.errorMsg = [];
    this.loading = true;

    // Validate required fields
    if (!this.bookRequest.title || !this.bookRequest.authorName || !this.bookRequest.isbn) {
      this.errorMsg.push('Title, Author Name, and ISBN are required.');
      this.loading = false;
      return;
    }

    // Save book details
    this.bookService.saveBook({ body: this.bookRequest }).subscribe({
      next: (bookId) => {
        if (this.selectedBookCover) {
          // Upload book cover if available
          this.bookService.uploadBookCoverPicture({
            'book-id': bookId,
            body: { file: this.selectedBookCover }
          }).subscribe({
            next: () => this.handleSaveSuccess(),
            error: () => this.handleError('Failed to upload the book cover.')
          });
        } else {
          this.handleSaveSuccess();
        }
      },
      error: (err) => this.handleError(err.error?.validationErrors || 'An error occurred while saving the book.')
    });
  }

  /**
   * Handles successful save actions.
   */
  private handleSaveSuccess(): void {
    this.router.navigate(['/books/my-books']);
    this.loading = false;
  }

  /**
   * Handles errors and displays messages.
   * @param message Error message
   */
  private handleError(message: string | string[]): void {
    this.errorMsg = Array.isArray(message) ? message : [message];
    this.loading = false;
  }
}
