import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser, UpdateUserPassword } from '@pito/types';
import { LoggedUser } from '../../decorators/user.decorator';

import { User } from '@pito/db';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Patch()
  public async updateLoggedUser(
    @LoggedUser() user: User,
    @Body() body: UpdateUser,
  ) {
    return this.service.updateUser(user.id, body);
  }

  @Get()
  public async getLoggedUser(@LoggedUser() user: User) {
    return this.service.excludeFields(user);
  }

  @Post()
  public async updateLoggedUserPassword(
    @LoggedUser() user: User,
    @Body() body: UpdateUserPassword,
  ) {
    return this.service.updateUserPassword(user.id, body);
  }

  @Patch(':userId')
  public async updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUser,
  ) {
    return this.service.updateUser(userId, body);
  }

  @Get(':userId')
  public async getUser(@Param('userId') userId: string) {
    return this.service.findById(userId);
  }

  @Get(':userId')
  public async updatePassword(
    @Param('userId') userId: string,
    @Body() body: UpdateUserPassword,
  ) {
    return this.service.updateUserPassword(userId, body);
  }
}
