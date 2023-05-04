import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/api/app.module';
import {PrismaService} from "../src/prisma/prisma.service";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const prismaService = app.get(PrismaService);
    app.useGlobalPipes(new ValidationPipe());
    await prismaService.enableShutdownHooks(app);
    await app.init();
  });

  it('/auth/login - Should failed with missing json body', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .expect(400)
  });

  it('/auth/login - Should failed with missing json body', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({email: 'a@a.fr', password: '358227'})
      .expect(400)
  });
});
