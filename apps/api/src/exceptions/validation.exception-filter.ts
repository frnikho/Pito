import {ExceptionFilter, Catch, ArgumentsHost, Logger} from '@nestjs/common';
import { Response } from 'express';
import {ValidationException} from "@pito/types";

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    Logger.warn('Error thrown: PIT_400001', 'ValidationException');
    Logger.debug({
      errors: exception.errors,
      target: exception.target?.constructor?.name ?? undefined,
    }, 'ValidationException');
    response
      .status(400)
      .json({
        timestamp: new Date().toISOString(),
        message: exception.errors,
        code: 'PIT_400001',
      });
  }
}