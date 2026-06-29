export type HomeStats = {
  totalEvents: number;
  totalSpeakers: number;
  totalSessions: number;
};

export type HeroSession = {
  id: number;
  title: string;
  eventId: string;
  eventTitle: string;
  speakerName: string;
  roomName: string;
  startTime: string;
  endTime: string;
  live: boolean;
};
