import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  LoginUser,
  RegisterUser,
  AuthWrongPasswordException,
  UserNotFoundException, AuthToken, AuthInvalidTokenException, AuthUserAlreadyExistException,
} from '@pito/types';
import { User } from '@pito/db';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(body: LoginUser): Promise<AuthToken> {
    const findUser = await this.prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!findUser) throw new UserNotFoundException();
    if (!bcrypt.compareSync(body.password, findUser.password))
      throw new AuthWrongPasswordException();
    return this.sign(findUser);
  }

  public sign(user: User): AuthToken {
    return {
      token: this.jwtService.sign({
        id: user.id,
      })
    };
  }

  public async validate(token: AuthToken): Promise<User> {
    let decoded;
    try {
      decoded = this.jwtService.decode(token.token);
    } catch (ex) {
      throw new AuthInvalidTokenException();
    }
    if (!decoded)
      throw new AuthInvalidTokenException();
    const user = await this.prisma.user.findFirst({
      where: {
        id: decoded['id']
      },
      include: {
        role: true
      }
    });
    if (!user)
      throw new AuthInvalidTokenException();
    return user;
  }

  public async register(body: RegisterUser) {
    if (await this.prisma.user.findFirst({where: {email: body.email}}) != null)
      throw new AuthUserAlreadyExistException();
    const salt = await bcrypt.genSalt();
    const password = bcrypt.hashSync(body.password, salt);
    return this.userService.excludeFields(
      await this.userService.create({
        ...body,
        password,
      }),
    );
  }
}
