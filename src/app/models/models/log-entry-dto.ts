export interface LogEntryDto {
    id: number;
    service: string;
    level: string;
    message: string;
    timestamp: Date;
  }