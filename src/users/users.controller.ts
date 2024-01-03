import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Query,
  Param,
  Delete,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos'; //validação
import { UpdateUserDto } from './dtos/update-user.dtos';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService:AuthService
    ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email,body.password)
  }

  @Post('/signin')
  signin(@Body() body:CreateUserDto){
    return this.authService.signin(body.email,body.password)
  }

  //@UseInterceptors(new SerializeInterceptor(UserDto))
  @Serialize(UserDto)
  @Get('/user/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if(!user){
      throw new NotFoundException('user not found mother a fuck')
    }
    return user
  }

  @Get('/all')
  UserAll() {
    return this.userService.findAll();
  }

  @Get()
  findUserUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
