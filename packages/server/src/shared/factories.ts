import { faker } from '@faker-js/faker';
import type {
  Paginated,
  PaginationParams,
} from 'brain-agriculture-backend-types';

export const queryParamsFactory = (params?: PaginationParams) => ({
  page: faker.number.int({ max: 10, min: 0 }),
  searchTerm: faker.lorem.word(),
  size: faker.number.int({ max: 10, min: 0 }),
  ...params,
});

export const paginationFactory = <T>(content: T[] = []) => {
  return {
    content: content,
    first: true,
    last: true,
    page: faker.number.int({ max: 10, min: 0 }),
    pages: faker.number.int({ max: 10, min: 0 }),
    size: faker.number.int({ max: 10, min: 0 }),
    total: faker.number.int({ max: 10, min: 0 }),
  } as Paginated<T>;
};
