import type { AxiosError } from 'axios';

export class HttpError extends Error {
  constructor(public error: AxiosError) {
    super(error.code);
    this.name = 'HttpError';
  }

  toString(): string {
    return String(this.data.message);
  }

  get data() {
    return this.error.response?.data as Record<string, unknown>;
  }

  get status() {
    return this.error.status;
  }
}
