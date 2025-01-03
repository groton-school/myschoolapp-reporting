export class AreaError extends Error {
  public constructor(message?: string) {
    super(`Content area snapshot error${message ? `: ${message}` : ''}`);
  }
}
