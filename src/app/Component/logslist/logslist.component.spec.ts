import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogslistComponent } from './logslist.component';

describe('LogslistComponent', () => {
  let component: LogslistComponent;
  let fixture: ComponentFixture<LogslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogslistComponent]
    });
    fixture = TestBed.createComponent(LogslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
