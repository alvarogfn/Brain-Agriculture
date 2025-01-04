import { mocked } from './__mocks__/mock';

export function fetchUserMe(): Promise<unknown> {
  return Promise.resolve(mocked.generate());
}
