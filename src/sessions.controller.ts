import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  register(@Body() body: any) {
    const user = { id: 'u' + Date.now(), ...body };
    return user;
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  login(@Body() body: any) {
    return { status: 'success', token: 'fake-jwt-token' };
  }
}
