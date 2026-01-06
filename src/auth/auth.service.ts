import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateToken(token: string) {
    return token === 'fake-jwt-token';
  }
}
