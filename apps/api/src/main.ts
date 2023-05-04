import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { PrismaService } from './prisma/prisma.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ApiExceptionFilter } from './exceptions/api.exception-filter';
import { ValidationExceptionFilter } from './exceptions/validation.exception-filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { winstonLoggerService } from './service/winston.service';
import { validationService } from './service/validation.service';
import {PrismaExceptionFilter} from "./exceptions/prisma.exception-filter";

class Server {
  private app: NestExpressApplication;

  constructor() {}

  public async start() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: winstonLoggerService(),
    });
    await this.config();
    await this.app.listen(3000, () => {
      Logger.log('Application startup !', 'NestApplication');
    });
  }

  private async config() {
    const prismaService = this.app.get(PrismaService);
    this.app.useGlobalFilters(new ApiExceptionFilter());
    this.app.useGlobalFilters(new ValidationExceptionFilter());
    this.app.useGlobalFilters(new PrismaExceptionFilter());
    this.app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: validationService,
      }),
    );
    await prismaService.enableShutdownHooks(this.app);
  }
}

new Server().start();
