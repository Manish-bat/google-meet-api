import { Injectable } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import * as path from 'path';

@Injectable()
export class GoogleMeetService {
  private auth;
  private calendar: calendar_v3.Calendar;

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    this.auth = await authenticate({
      keyfilePath: path.join(__dirname, '../../credentials.json'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    this.calendar = google.calendar({ version: 'v3', auth: this.auth });
  }

  async listMeetings() {
    const res = await this.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return res.data.items;
  }

  async createMeeting(meetingDetails: any) {
    const event = {
      summary: meetingDetails.summary,
      description: meetingDetails.description,
      start: {
        dateTime: meetingDetails.startTime,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: meetingDetails.endTime,
        timeZone: 'America/Los_Angeles',
      },
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const res = await this.calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });

    return res.data;
  }

  async getMeetingDetails(meetingId: string) {
    const res = await this.calendar.events.get({
      calendarId: 'primary',
      eventId: meetingId,
    });
    return res.data;
  }
}
