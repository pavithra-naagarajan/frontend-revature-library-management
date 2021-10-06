import { Book } from "./book";
import { User } from "./user";

export class IssueBook {
	issueId?: number;
	issueDate?: Date;
	dueDate?: Date;
	fineAmount?: number;
	user?: User
	book?: Book

}
