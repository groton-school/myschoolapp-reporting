export class InitializationError extends Error {
  public constructor(message?: string) {
    super(
      `The session has been accessed before initialization is complete${message ? `: ${message}` : '.'}`
    );
  }
}
