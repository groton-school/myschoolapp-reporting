import * as Debug from './Debug.js';

export class CustomError extends Error {
  public constructor(base: string, message?: string) {
    super(Debug.format(base, message));
  }
}
