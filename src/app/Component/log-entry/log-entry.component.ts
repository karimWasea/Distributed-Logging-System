import { Component, OnInit } from '@angular/core';
import { LogEntryCreateDto } from 'src/app/models/models/log-entry-create-dto';
import { LogEntryDto } from 'src/app/models/models/log-entry-dto';
import { LogEntrySearchDto } from 'src/app/models/models/log-entry-search-dto';
import { LogEntryUpdateDto } from 'src/app/models/models/log-entry-update-dto';
import { LogEntryService } from 'src/app/Servess/log-entry.service';

@Component({
  selector: 'app-log-entry',
  templateUrl: './log-entry.component.html',
  styleUrls: ['./log-entry.component.css'],
})
export class LogEntryComponent implements OnInit {
  logEntries: LogEntryDto[] = [];
  newLogEntry: LogEntryCreateDto = {
    service: '',
    level: '',
    message: '',
  };
  searchDto: LogEntrySearchDto = {
    pageNumber: 1,
    pageSize: 10,
  };
  selectedLogEntry: LogEntryDto | null = null;

  constructor(private logEntryService: LogEntryService) {}

  ngOnInit(): void {
    // this.fetchLogEntries();
  }

  fetchLogEntries(): void {
    this.logEntryService.getAllLogEntries(this.searchDto).subscribe(
      (data) => {
        this.logEntries = data;
      },
      (error) => {
        console.error('Failed to fetch log entries:', error);
      }
    );
  }

  createLogEntry(): void {
    this.logEntryService.createLogEntry(this.newLogEntry).subscribe(
      (data) => {
        console.log('Log entry created:', data);
        this.fetchLogEntries(); // Refresh the list
        this.newLogEntry = { service: '', level: '', message: '' }; // Reset the form
      },
      (error) => {
        console.error('Failed to create log entry:', error);
      }
    );
  }

  updateLogEntry(id: number, logEntry: LogEntryUpdateDto): void {
    this.logEntryService.updateLogEntry(id, logEntry).subscribe(
      () => {
        console.log('Log entry updated');
        this.fetchLogEntries(); // Refresh the list
        this.selectedLogEntry = null; // Clear the selected log entry
      },
      (error) => {
        console.error('Failed to update log entry:', error);
      }
    );
  }

  deleteLogEntry(id: number): void {
    this.logEntryService.deleteLogEntry(id).subscribe(
      () => {
        console.log('Log entry deleted');
        this.fetchLogEntries(); // Refresh the list
      },
      (error) => {
        console.error('Failed to delete log entry:', error);
      }
    );
  }

  selectLogEntry(logEntry: LogEntryDto): void {
    this.selectedLogEntry = { ...logEntry };
  }

  clearSelection(): void {
    this.selectedLogEntry = null;
  }
}
