import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';

import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  register(@Body() userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    return this.userService.register(userData);
  }

  @Post('/login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }

  // @Post('/pro')
  // @UseGuards(JwtAuthGuard)
  // cone(@Body() credentials: LoginCredentialsDto, @Req() request: Request) {
  //   console.log(request.user);
  //   return 'oui';
  // }

  @Post('/pro')
  @UseGuards(JwtAuthGuard)
  cone(@Body() credentials: LoginCredentialsDto, @User() user) {
    console.log(user);
    return 'oui';
  }
}
