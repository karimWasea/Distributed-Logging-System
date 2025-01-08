import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogenComponent } from './logen.component';

describe('LogenComponent', () => {
  let component: LogenComponent;
  let fixture: ComponentFixture<LogenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogenComponent]
    });
    fixture = TestBed.createComponent(LogenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
