import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogEntrySearchDto } from '../models/models/log-entry-search-dto';
import { LogEntryDto } from '../models/models/log-entry-dto';
import { LogEntryCreateDto } from '../models/models/log-entry-create-dto';
import { LogEntryUpdateDto } from '../models/models/log-entry-update-dto';

@Injectable({
  providedIn: 'root',
})
export class LogEntryService {
  private logEntryApiUrl = 'https://localhost:44375/api/LogEntry'; // LogEntry API URL

  constructor(private http: HttpClient) {}

  // Helper method to add the Authorization header with the token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    });
  }

  getAllLogEntries(searchDto: LogEntrySearchDto): Observable<LogEntryDto[]> {
    // const headers = this.getHeaders();

    // Convert Date objects to strings for query parameters
    const params = new HttpParams({
      fromObject: {
        ...searchDto,
        startTimestamp: searchDto.startTimestamp?.toISOString() || '',
        endTimestamp: searchDto.endTimestamp?.toISOString() || '',
      },
    });

    return this.http.get<LogEntryDto[]>(this.logEntryApiUrl, {
      // headers,
      params,
    });
  }

  // Get a log entry by ID
  getLogEntryById(id: number): Observable<LogEntryDto> {
    const headers = this.getHeaders();
    return this.http.get<LogEntryDto>(`${this.logEntryApiUrl}/${id}`, {
      headers,
    });
  }

  // Create a new log entry
  createLogEntry(logEntry: LogEntryCreateDto): Observable<LogEntryDto> {
    const headers = this.getHeaders();
    return this.http.post<LogEntryDto>(this.logEntryApiUrl, logEntry, {
      headers,
    });
  }

  // Update a log entry
  updateLogEntry(id: number, logEntry: LogEntryUpdateDto): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.logEntryApiUrl}/${id}`, logEntry, {
      headers,
    });
  }

  // Delete a log entry
  deleteLogEntry(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.logEntryApiUrl}/${id}`, { headers });
  }
}
