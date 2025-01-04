import type { AxiosResponse } from 'axios';

export class HttpError extends Error {
  constructor(public response: AxiosResponse) {
    super(response.statusText);
    this.name = 'HttpError';
  }

  get data() {
    return this.response.data;
  }

  get status() {
    return this.response.status;
  }
}
