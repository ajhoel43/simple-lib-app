export default class Book {
	public id: number;
	public title: string;
	public author: string;
	public isBorrowed: boolean = false;
	public borrowedBy: number | null = null;

	constructor(id: number, title: string, author: string) {
		this.id = id;
		this.title = title;
		this.author = author;
	}

	borrowBook(memberId: number) {
		this.isBorrowed = true;
		this.borrowedBy = memberId;
	}

	returnBook() {
		this.borrowedBy = null;
		this.isBorrowed = false;
	}
}
