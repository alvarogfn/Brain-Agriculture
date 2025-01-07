import { BadRequestException } from '@nestjs/common';
import z from 'zod';

import { SchemaValidationPipe } from './schema-validation.pipe';

const schema = z.object({
  id: z.number(),
  name: z.string(),
});

describe('SchemaValidationPipe', () => {
  it('should be defined', () => {
    expect(new SchemaValidationPipe(schema)).toBeDefined();
  });

  it('should validate and return the value if it matches the schema', () => {
    const pipe = new SchemaValidationPipe(schema);
    const value = { id: 1, name: 'Test' };
    expect(pipe.transform(value)).toEqual(value);
  });

  it('should throw BadRequestException if the value does not match the schema', () => {
    const pipe = new SchemaValidationPipe(schema);
    const value = { id: 'not-a-number', name: 'Test' };
    expect(() => pipe.transform(value)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if required fields are missing', () => {
    const pipe = new SchemaValidationPipe(schema);
    const value = { id: 1 };
    expect(() => pipe.transform(value)).toThrow(BadRequestException);
  });
});
