import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Paginated } from 'brain-agriculture-backend-types';

type ApiOkPaginatedArgs<T extends Type<unknown>> = Omit<
  Parameters<typeof ApiOkResponse>[0],
  'schema'
> & {
  type: T;
};

export const ApiOkPaginated = <T extends Type<unknown>>({
  type,
  ...args
}: ApiOkPaginatedArgs<T>) =>
  applyDecorators(
    ApiExtraModels(Paginated, type),
    ApiOkResponse({
      ...args,
      schema: {
        allOf: [
          { $ref: getSchemaPath(Paginated) },
          {
            properties: {
              content: {
                items: { $ref: getSchemaPath(type) },
                type: 'array',
              },
            },
          },
        ],
      },
    }),
  );
