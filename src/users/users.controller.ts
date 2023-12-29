import { Body,Controller,Post,Get,Patch,Query,Param,Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos'; //validação
import { UpdateUserDto } from './dtos/update-user.dtos';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

  constructor(private userService:UsersService){}

  @Post('/signup')
  createUser(@Body() body:CreateUserDto){
    this.userService.create(body.email,body.password)
    console.log(body)
  }

  @Get('/:id')
  findUser(@Param('id') id:string){
    return this.userService.findOne(parseInt(id))
  }

  @Get()
  findUserUsers(@Query('email') email:string){
    return this.userService.find(email)
  }

  @Patch('/:id')
  updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){
    return this.userService.update(parseInt(id),body)
  }

  @Delete('/:id')
  removeUser(@Param('id') id:string){
    return this.userService.remove(parseInt(id))
  }
}
