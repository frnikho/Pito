import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { mockPrisma } from '../../../test/factory/PrismaServiceFactory';
import { User } from '@pito/db';

const mockedUsers: User[] = [
  {
    email: 'patrick@gmail.com',
    password: 'patrick123',
    lastname: 'Patrick',
    firstname: 'Deunier',
    authMethod: 'NATIVE',
    picture: null,
    updatedAt: new Date(),
    createdAt: new Date(),
    ahr: 350.0,
    address: null,
    crn: null,
    city: null,
    id: 'clh2ifvo9000099ku5438x2ln',
    phone: null,
  },
  {
    email: 'lucas@gmail.com',
    password: 'lucas123',
    lastname: 'Lucas',
    firstname: 'Money',
    authMethod: 'NATIVE',
    picture: null,
    updatedAt: new Date(),
    createdAt: new Date(),
    ahr: 290.0,
    address: null,
    crn: null,
    city: null,
    id: 'clh2ifvo9000099ku5438x2lp',
    phone: null,
  },
];

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({ secret: process.env.JWT_SECRET, global: true }),
      ],
      providers: [PrismaService, AuthService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    mockPrisma(prisma, {}, null);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Login', () => {
    it('Should login an user', async () => {
      mockPrisma(prisma, {create: mockedUsers[0], find: {
        ...mockedUsers[0],
          password: '$2b$10$l605ywMLJz/EPks1ZisgDOEMSraJwy03zKFqS9mGLNqZv0Mj/1eW.'
        }}, null);
      const a = await service.login({
        ...mockedUsers[0],
        password: '358227'
      });
      expect(a.token).toBeDefined();
    });

    it('Should not login an user with bad password', async () => {
      mockPrisma(prisma, {create: mockedUsers[0], find: {
          ...mockedUsers[0],
        }}, null);
      try {
        await service.login({
          ...mockedUsers[0],
          password: '358227'
        });
        expect(false).toBeTruthy();
      } catch (ex) {
        expect(true).toBeTruthy();
      }
    });

    it('Should not login an non existing user', async () => {
      mockPrisma(prisma, {create: null, find: null}, null);
      try {
        await service.login({
          ...mockedUsers[0],
          password: '358227'
        });
        expect(false).toBeTruthy();
      } catch (ex) {
        expect(true).toBeTruthy();
      }
    });
  });

  describe('Register', () => {
    it('Register an user', async () => {
      mockPrisma(prisma, {create: mockedUsers[0], find: null}, null);
      const registeredUser = await service.register({
        email: 'a@a.fr',
        lastname: '',
        firstname: '',
        password: '',
      });
      expect(registeredUser).toBeDefined();
      expect(registeredUser['password']).toBeUndefined();
    });

    it('Should not register an existing user', async () => {
      mockPrisma(prisma, {create: mockedUsers[0], find: mockedUsers[0]}, null);
      try {
        await service.register({
          email: 'a@a.fr',
          lastname: '',
          firstname: '',
          password: '',
        });
        expect(false).toBeTruthy();
      } catch (ex) {
        expect(true).toBeTruthy();
      }
    });
  });
});
