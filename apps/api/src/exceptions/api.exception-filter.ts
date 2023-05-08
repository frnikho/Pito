import {ExceptionFilter, Catch, ArgumentsHost, Logger} from '@nestjs/common';
import { Response } from 'express';
import {ApiException} from "@pito/types";

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    Logger.warn('Error thrown: ' + exception.code, 'ApiException');
    Logger.debug({
      errors: exception.code,
      message: exception.message,
    }, 'ValidationException');
    response
      .status(exception.statusCode)
      .json({
        timestamp: new Date().toISOString(),
        message: exception.message,
        code: exception.code,
      });
  }
}