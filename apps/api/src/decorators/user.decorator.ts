import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const LoggedUser = createParamDecorator(
  (permission: string | undefined = undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);