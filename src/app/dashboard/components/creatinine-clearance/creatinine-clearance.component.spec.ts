import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatinineClearanceComponent } from './creatinine-clearance.component';

describe('CreatinineClearanceComponent', () => {
  let component: CreatinineClearanceComponent;
  let fixture: ComponentFixture<CreatinineClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatinineClearanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatinineClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
