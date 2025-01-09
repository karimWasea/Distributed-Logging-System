import { Component, OnInit } from '@angular/core';
import { LogEntryDto } from 'src/app/models/models/log-entry-dto';
import { LogEntryService } from 'src/app/Servess/log-entry.service';

@Component({
  selector: 'app-logslist',
  templateUrl: './logslist.component.html',
  styleUrls: ['./logslist.component.css'],
})
export class LogslistComponent implements OnInit {
  logEntries: LogEntryDto[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  searchCriteria: {
    pageNumber: number;
    pageSize: number;
    service?: string;
    level?: string;
    startTimestamp?: Date;
    endTimestamp?: Date;
    message?: string;
  } = {
    pageNumber: 1,
    pageSize: 10,
  };

  constructor(private logEntryService: LogEntryService) {}

  ngOnInit(): void {
    this.fetchLogEntries();
  }

  fetchLogEntries(): void {
    console.log('fetching log entries');
    this.isLoading = true;
    this.logEntryService.getAllLogEntries(this.searchCriteria).subscribe({
      next: (data) => {
        console.log('fetching log entries1');

        this.logEntries = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('fetching log entries2');

        // console.error('Error fetching log entries:', error);
        this.errorMessage =
          'Failed to load log entries. Please try again later.';
        this.isLoading = false;
      },
    });
  }
  previousPage(): void {
    if (this.searchCriteria.pageNumber > 1) {
      this.searchCriteria.pageNumber--;
      this.fetchLogEntries();
    }
  }

  nextPage(): void {
    this.searchCriteria.pageNumber++;
    this.fetchLogEntries();
  }

  clearSearch(): void {
    this.searchCriteria = {
      pageNumber: 1,
      pageSize: 10,
    };
    this.fetchLogEntries();
  }
}
