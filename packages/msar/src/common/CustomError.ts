export class CustomError extends Error {
  public constructor(base: string, message?: string) {
    super(`${base}${message ? `: ${message}` : '.'}`);
  }
}
