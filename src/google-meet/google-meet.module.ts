import { Module } from '@nestjs/common';
import { GoogleMeetController } from './google-meet.controller';
import { GoogleMeetService } from './google-meet.service';

@Module({
  controllers: [GoogleMeetController],
  providers: [GoogleMeetService],
})
export class GoogleMeetModule {}
