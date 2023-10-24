import { PageNotFoundError } from "next/dist/shared/lib/utils";

export class DatabaseError extends Error {
  constructor(message = 'An error occurred while attempting to query the database') {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Page Not Found') {
    super(message);
    this.name = 'NotFoundError';
  }
}