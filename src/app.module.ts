import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GoogleMeetModule } from './google-meet/google-meet.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, GoogleMeetModule],
})
export class AppModule {}
