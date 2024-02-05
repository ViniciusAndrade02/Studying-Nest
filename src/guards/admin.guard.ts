import { CanActivate,ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate{

  canActivate(context: ExecutionContext) {
      
    const request = context.switchToHttp().getRequest()
    if(!request.currentUser){
      return false
    }

    //se for true é admin caso contrario n é
    return request.currentUser.admin

  }
}