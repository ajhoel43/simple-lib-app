import type BookRepo from "../repo/bookRepo";

export default class BookService {
	constructor(private bookRepo: BookRepo) {}

	getAllBooks() {
		return this.bookRepo.books;
	}

	getBorrowedBooks(memberId: number) {
		return this.bookRepo.books.filter((book) => book.borrowedBy === memberId);
	}

	postBorrowBook(bookId: number, memberId: number) {
		try {
			const book = this.bookRepo.getById(bookId);
			if (!book || book.isBorrowed) {
				throw new Error("Book not avail");
			}

			// Book avail
			book.borrowBook(memberId);

			return true;
		} catch (error) {
			return false;
		}
	}

	postReturnBook(bookId: number) {
		try {
			const book = this.bookRepo.getById(bookId);
			if (!book) throw new Error("Cannot return book");

			book.returnBook();
			return true;
		} catch (error) {
			return false;
		}
	}
}
