export type Parsed = {
  ignoreErrors: boolean;
  batchSize: number;
  logRequests: boolean;
};

export function parse(values: Record<string, any>): Parsed {
  return {
    ignoreErrors: !!values.ignoreErrors,
    batchSize: parseInt(values.batchSize),
    logRequests: !!values.logRequests
  };
}
