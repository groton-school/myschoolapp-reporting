import { CustomError } from '../../../common.js';
export class AreaError extends CustomError {
  public constructor(message?: string) {
    super('Content area snapshot error', message);
  }
}
