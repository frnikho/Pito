import {ExceptionFilter, Catch, ArgumentsHost, Logger} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@pito/db';

export type PrismaErrorMapType = {
  error: string;
  statusCode?: number;
  message: string;
}

const PrismaErrors: PrismaErrorMapType[] = [
  {
    statusCode: 400,
    error: 'P2025',
    message: 'Entity not found !',
  }
]

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientUnknownRequestError, Prisma.PrismaClientRustPanicError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    Logger.error(`Error thrown: PIT_500001 (${exception.code} - ${exception.clientVersion})`, 'PrismaException', 'PrismaException');
    Logger.error({code: exception.code, client: exception.clientVersion}, 'PrismaException', 'PrismaException');
    const prismaError = PrismaErrors.find((error) => error.error === exception.code);
    if (prismaError) {
      return response.status(prismaError.statusCode ?? 500).json({
        timestamp: new Date().toISOString(),
        message: prismaError.message,
        code: 'PIT_' + prismaError.error,
      });
    }
    response.status(500).json({
      timestamp: new Date().toISOString(),
      message: "An database error occurred, please try again later !",
      code: 'PIT_500001',
    });
  }
}
