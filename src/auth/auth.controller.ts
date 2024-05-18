import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser( @Body() loginUserDto: LoginUserDto ) {
    return this.authService.loginUser( loginUserDto );
  }

  @Post('register')
  registerUser( @Body() registerUserDto: RegisterUserDto ) {
    return this.authService.registerUser( registerUserDto );
  }

  @Get('users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('user/:id')
  getUserById( @Param('id', ParseUUIDPipe) id: string ) {
    return this.authService.getUserById(id);
  }

  @Patch('user/deactivate/:id')
  chanceActive( @Param('id', ParseUUIDPipe) id: string ) {
    return this.authService.chanceActiveUser( id )
  }

  @Patch('user/update')
  updateUser( @Body() updateUserDto: UpdateUserDto ){
    return this.authService.updateUser( updateUserDto );
  }

  
}
