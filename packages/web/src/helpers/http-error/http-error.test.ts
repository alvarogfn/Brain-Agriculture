import type { AxiosResponse } from 'axios';
import { describe, expect, it } from 'vitest';

import { HttpError } from './http-error';

describe('HttpError', () => {
  it('should create an instance of HttpError with the correct properties', () => {
    const response = {
      data: { message: 'Erro' },
      status: 404,
      statusText: 'Not Found',
    } as AxiosResponse;

    const error = new HttpError(response);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('HttpError');
    expect(error.message).toBe('Not Found');
    expect(error.response).toBe(response);
    expect(error.data).toBe(response.data);
    expect(error.status).toBe(404);
  });
});
