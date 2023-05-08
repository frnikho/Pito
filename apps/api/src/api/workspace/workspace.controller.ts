import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {LoggedUser} from "../../decorators/user.decorator";
import {User} from '@pito/db';
import {WorkspaceService} from "./workspace.service";
import {CreateWorkspace} from "@pito/types";

@Controller('workspace')
export class WorkspaceController {

  constructor(private service: WorkspaceService) {
  }

  @Get()
  public async listWorkspace(@LoggedUser() user: User) {
    return this.service.list(user, user.id);
  }

  @Get('list/:id')
  public async listUserWorkspace(@LoggedUser() user: User, @Param('id') userId: string) {
    return this.service.list(user, userId);
  }

  @Get(':id')
  public async getWorkspace(@LoggedUser() user: User, @Param('id') id: string) {
    return this.service.find(user, id);
  }

  @Post()
  public async create(@LoggedUser() user: User, @Body() body: CreateWorkspace) {
    return this.service.create(user, body);
  }

  @Delete()
  public async deleteWorkspace(@LoggedUser() user: User, @Param('id') id: string) {

  }

  @Patch()
  public async update(@LoggedUser() user: User, @Param('id') id: string) {

  }

}
