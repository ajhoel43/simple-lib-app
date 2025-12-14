import type Book from "@/backend/entities/book";
import type Member from "@/backend/entities/member";

type MemberSection = {
	members: Member[];
	onChangeMember: (memberId: number) => void;
	borrowedBooks: Book[];
	onReturn: (bookId: number) => void;
};
export default function MemberSection({
	members,
	onChangeMember,
	borrowedBooks,
	onReturn,
}: MemberSection) {
	return (
		<div className="flex flex-col gap-2">
			<h2>Member Section</h2>
			<div className="flex justify-between">
				<label htmlFor="member">Select Member</label>
				<select
					name="member"
					id={"member"}
					onChange={(e) => onChangeMember(Number(e.target.value))}
				>
					{members.map((member) => (
						<option key={member.id} value={member.id}>
							{member.name}
						</option>
					))}
				</select>
			</div>
			<div className="border rounded">
				{borrowedBooks && borrowedBooks.length > 0 ? (
					borrowedBooks.map((book) => (
						<div key={book.id} className="flex justify-between border-b-2 p-2">
							<div className="flex gap-2 items-center">
								<span>{book.title}</span>
								<span className="text-xs">{book.author}</span>
							</div>
							<button
								type="button"
								className="border rounded bg-red-700 text-xs p-1"
								onClick={() => onReturn(book.id)}
							>
								Return
							</button>
						</div>
					))
				) : (
					<span>No Books Borrowed</span>
				)}
			</div>
		</div>
	);
}
