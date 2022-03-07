import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCFormFComponent } from './section-cform-f.component';

describe('SectionCFormFComponent', () => {
  let component: SectionCFormFComponent;
  let fixture: ComponentFixture<SectionCFormFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionCFormFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCFormFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
