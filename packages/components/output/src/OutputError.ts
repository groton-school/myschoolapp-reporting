import { Debug } from '@msar/debug';

export class OutputError extends Debug.CustomError {
  public constructor(message?: string) {
    super('Output options have not been defined', message);
  }
}
