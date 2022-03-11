import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureMsgComponent } from './failure-msg.component';

describe('FailureMsgComponent', () => {
  let component: FailureMsgComponent;
  let fixture: ComponentFixture<FailureMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailureMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
