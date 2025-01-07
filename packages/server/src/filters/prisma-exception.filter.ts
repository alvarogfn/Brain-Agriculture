import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let statusCode = 500;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002': {
        statusCode = 400;
        message = 'Unique constraint failed';
      }
    }

    response.status(statusCode).json({
      fields: exception.meta.target,
      message,
      path: request.url,
      statusCode: statusCode,
    });
  }
}
