import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GoogleMeetService } from './google-meet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google-meet')
@UseGuards(AuthGuard('google'))
export class GoogleMeetController {
  constructor(private readonly googleMeetService: GoogleMeetService) {}

  @Get('meetings')
  async listMeetings() {
    return this.googleMeetService.listMeetings();
  }

  @Post('create')
  async createMeeting(@Body() meetingDetails: any) {
    return this.googleMeetService.createMeeting(meetingDetails);
  }

  @Get('meeting/:meetingId')
  async getMeetingDetails(@Param('meetingId') meetingId: string) {
    return this.googleMeetService.getMeetingDetails(meetingId);
  }
}