import { beforeEach, describe, expect, it, vi } from "vitest";
import Book from "@/backend/entities/book";
import BookService from "@/backend/service/bookService";

describe("BookService", () => {
	let bookService: BookService;
	let bookRepo: any;

	// dummy
	const books = Array.from({ length: 4 }, (_, i) => {
		const id = i + 1;
		return new Book(id, `Book ${id}`, `Author ${id}`);
	});

	beforeEach(() => {
		bookRepo = {
			getById: vi.fn(),
			books: [],
		};
		bookService = new BookService(bookRepo);
	});

	// Should Borrow
	it("Borrow Success", () => {
		const book = books[0];
		bookRepo.getById.mockReturnValue(book);
		const result = bookService.postBorrowBook(book.id, 40);

		expect(result).toBe(true);
		expect(book.isBorrowed).toBe(true);
	});

	it("Cant borrow unavail book", () => {
		const book = books[0]; // same id with the first test
		bookRepo.getById.mockReturnValue(book);
		// bookService.postBorrowBook(book.id, 30);

		const result = bookService.postBorrowBook(book.id, 20);
		// Result should be false, because book[0] is still borrowed by 40
		expect(result).toBe(false);
		expect(book.borrowedBy).toBe(40);
	});

	it("Return Success", () => {
		const book = books[0];
		bookRepo.getById.mockReturnValue(book);

		const result = bookService.postReturnBook(book.id);

		expect(result).toBe(true);
		expect(book.isBorrowed).toBe(false);
	});

	it("Display All Books", () => {
		bookRepo.books = [...books];

		const result = bookService.getAllBooks();
		expect(result).toEqual([...books]);
	});

	it("Display Borrowed Books", () => {
		bookRepo.books = [...books];
		books[2].borrowBook(40);

		const result = bookService.getBorrowedBooks(40);
		expect(result).toEqual([books[2]]);
	});
});
