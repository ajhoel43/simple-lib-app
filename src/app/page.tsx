"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type Book from "@/backend/entities/book";
import BookRepo from "@/backend/repo/bookRepo";
import MemberRepo from "@/backend/repo/memberRepo";
import BookService from "@/backend/service/bookService";
import BookSection from "./bookSection";
import MemberSection from "./memberSection";

// Init Class Repo
const bookRepo = new BookRepo();
const bookService = new BookService(bookRepo);
const memberRepo = new MemberRepo();

export default function Home() {
	const [books, setBooks] = useState<Book[]>(bookService.getAllBooks());
	const [selectedMember, setSelectedMember] = useState<number>(
		memberRepo.members[0].id,
	);
	const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

	const changeMember = useCallback((memberId: number) => {
		console.log("Member Changed: ", memberId);
		setSelectedMember(memberId);
	}, []);

	useEffect(() => {
		if (selectedMember != null)
			setBorrowedBooks(bookService.getBorrowedBooks(selectedMember));
	}, [selectedMember]);

	const borrowBook = useCallback((bookId: number, memberId: number) => {
		console.log("Borrow Book", bookId, memberId);
		bookService.postBorrowBook(bookId, memberId);
		setBorrowedBooks(bookService.getBorrowedBooks(memberId));
		setBooks(bookService.getAllBooks());
	}, []);

	const returnBook = useCallback((bookId: number, memberId: number) => {
		console.log("Return Book", bookId);
		bookService.postReturnBook(bookId);
		setBorrowedBooks(bookService.getBorrowedBooks(memberId));
	}, []);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-2 py-32 px-16 bg-white dark:bg-black sm:items-start">
				<h1 className="text-lg font-bold">Simple Library App</h1>
				<div className="grid grid-cols-2 gap-2 w-full">
					<BookSection
						books={books}
						onBorrow={(bookId) => borrowBook(bookId, selectedMember)}
					/>
					<MemberSection
						members={memberRepo.members}
						onChangeMember={changeMember}
						borrowedBooks={borrowedBooks}
						onReturn={(bookId) => returnBook(bookId, selectedMember)}
					/>
				</div>
			</main>
		</div>
	);
}
