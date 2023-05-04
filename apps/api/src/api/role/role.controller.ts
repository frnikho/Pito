import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LoggedUser } from '../../decorators/user.decorator';
import { ChangeDefaultRole, CreateRole } from '@pito/types';
import { User } from '@pito/db';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private service: RoleService) {}

  @Post()
  public async create(@LoggedUser() user: User, @Body() body: CreateRole) {
    return this.service.create(user, body);
  }

  @Get('id')
  public async get(@LoggedUser() user: User, @Param('id') id: string) {
    return this.service.find(user, id);
  }

  @Get()
  public async list(@LoggedUser() user: User) {
    return this.service.list(user);
  }

  @Patch('id')
  public async patch(@LoggedUser() user: User, @Param('id') id: string) {}

  @Delete('id')
  public async delete(@LoggedUser() user: User, @Param('id') id: string) {}

  @Post('change_default')
  public async changeDefault(
    @LoggedUser() user: User,
    @Body() body: ChangeDefaultRole,
  ) {}
}
