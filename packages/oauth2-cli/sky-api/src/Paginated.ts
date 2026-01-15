import { URLString } from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';
import * as Client from './Module.js';

type Data<T extends JSONValue> = {
  count?: number;
  next_link?: URLString;
  value?: T[];
};

export class Paginated<T extends JSONValue> implements AsyncIterable<T> {
  public constructor(private data: Data<T>) {}

  [Symbol.asyncIterator](): AsyncIterator<T> {
    let index = 0;
    let data = this.data;
    return {
      next: async () => {
        if (index === data.value?.length && data.next_link) {
          data = await Client.requestJSON<Data<T>>(data.next_link);
          index = 0;
        }

        if (data.value && index < data.value.length) {
          const value = data.value[index];
          index++;
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
      },
      return: async () => ({
        value: undefined,
        done: true
      })
    };
  }
}
