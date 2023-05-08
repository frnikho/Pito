import { Body, Controller, Post } from '@nestjs/common';
import { LoginUser, RegisterUser } from '@pito/types';
import { AuthService } from './auth.service';
import {Public} from "../../decorators/public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Public()
  @Post('register')
  public register(@Body() body: RegisterUser) {
    return this.service.register(body);
  }

  @Public()
  @Post('login')
  public login(@Body() body: LoginUser) {
    return this.service.login(body);
  }
}
