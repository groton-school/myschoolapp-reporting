import { URLString } from '@battis/descriptive-types';
import * as Client from './Client.js';

type Data<T> = {
  count?: number;
  next_link?: URLString;
  values?: T[];
};

export class Paginated<T> implements AsyncIterable<T> {
  private index = 0;

  public constructor(private data: Data<T>) {}

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return {
      next: async () => {
        if (this.index === this.data.values?.length && this.data.next_link) {
          this.data = await Client.requestJSON(this.data.next_link);
          this.index = 0;
        }

        if (this.data.values && this.index < this.data.values.length) {
          const value = this.data.values[this.index];
          this.index++;
          return {
            value,
            done: false
          };
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }
    };
  }
}
