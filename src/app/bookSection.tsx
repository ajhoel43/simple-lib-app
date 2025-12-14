import { useCallback, useState } from "react";
import type Book from "@/backend/entities/book";

type BookSectionProps = {
	books: Book[];
	onBorrow: (bookId: number) => void;
};

export default function BookSection({ books, onBorrow }: BookSectionProps) {
	const [filteredBooks, setFilter] = useState(books);
	const onFilter = useCallback(
		(value: string) => {
			setFilter(
				books.filter(
					(book) =>
						book.author.toLowerCase().includes(value) ||
						book.title.toLowerCase().includes(value),
				),
			);
		},
		[books],
	);

	return (
		<div className="flex flex-col gap-2">
			<h2>Book Section</h2>
			<div className="flex justify-between">
				<label htmlFor="search">Search</label>
				<input
					type="text"
					id={"search"}
					onChange={(e) => onFilter(e.target.value)}
					className="border rounded"
				/>
			</div>

			<div className="border rounded h-[60svh] overflow-x-scroll">
				{filteredBooks.map((book) => (
					<div
						className="border-b-2 p-2 flex items-center justify-between"
						key={book.id}
					>
						<div className="flex items-center gap-2">
							<span>{book.title}</span>
							<span className="text-xs">{book.author}</span>
						</div>
						{!book.isBorrowed ? (
							<button
								type="button"
								className="border rounded bg-blue-700 text-xs p-1"
								onClick={() => onBorrow(book.id)}
							>
								Borrow
							</button>
						) : (
							<span>borrowed by {book.borrowedBy}</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
