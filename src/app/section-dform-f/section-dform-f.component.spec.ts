import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDformFComponent } from './section-dform-f.component';

describe('SectionDformFComponent', () => {
  let component: SectionDformFComponent;
  let fixture: ComponentFixture<SectionDformFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionDformFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDformFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
