import Book from "../entities/book";

export default class BookRepo {
	public books: Book[] = [];
	constructor() {
		this.initBooks();
	}

	initBooks() {
		this.books = Array.from({ length: 25 }, (_, i) => {
			const id = i + 1;
			return new Book(id, `Book ${id}`, `Author ${id}`);
		});
	}

	getById(bookId: number) {
		return this.books.find((book) => book.id === bookId);
	}
}
