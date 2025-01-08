export interface LogEntrySearchDto extends PagedSearch {
    service?: string;
    level?: string;
    startTimestamp?: Date;
    endTimestamp?: Date;
    message?: string;
  }
  
  export interface PagedSearch {
    pageNumber: number;
    pageSize: number;
  }