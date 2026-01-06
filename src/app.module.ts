import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdoptionModule } from './adoption/adoption.module';
import { SessionsController } from './sessions.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AdoptionModule, AuthModule],
  controllers: [SessionsController],
})
export class AppModule {}
