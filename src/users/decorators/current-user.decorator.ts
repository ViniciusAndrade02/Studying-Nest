import { createParamDecorator,ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  //data significa quando informação que tiver no @CurrentUser('eeef')
  (data:never,context:ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.currentUser;
  }
)
