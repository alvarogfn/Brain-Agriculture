import { Injectable } from '@nestjs/common';
import { Paginated, PaginationParams } from 'brain-agriculture-backend-types';

@Injectable()
export class PaginateService {
  execute<T>(
    params: PaginationParams & { data: T[]; total: number },
  ): Paginated<T> {
    return {
      content: params.data,
      first: params.page === 0,
      last: params.page * params.size >= params.total,
      page: params.page,
      pages: Math.ceil(params.total / params.size),
      size: params.size,
      total: params.total,
    };
  }
}
