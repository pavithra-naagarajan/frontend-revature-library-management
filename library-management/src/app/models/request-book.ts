import { Book } from './book';
import { User } from './user';

export class RequestBook {
  requestId?: number;
  numberOfDays?: number;
  user?: User;
  book?: Book;
}
