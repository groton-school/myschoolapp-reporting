export type Parsed = {
  ignoreErrors: boolean;
  batchSize: number;
};

export function parse(values: Record<string, any>): Parsed {
  return {
    ignoreErrors: !!values.ignoreErrors,
    batchSize: parseInt(values.batchSize)
  };
}
