import Member from "../entities/member";

export default class MemberRepo {
	public members: Member[] = [];
	constructor() {
		this.initMember();
	}

	initMember() {
		this.members = Array.from({ length: 5 }, (_, i) => {
			const id = i + 1;
			return new Member(id, `Member ${id}`);
		});
	}
}
