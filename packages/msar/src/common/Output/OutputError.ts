import { CustomError } from '../CustomError.js';

export class OutputError extends CustomError {
  public constructor(message?: string) {
    super('Output options have not been defined', message);
  }
}
