import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cha2ds2VascComponent } from './cha2ds2-vasc.component';

describe('Cha2ds2VascComponent', () => {
  let component: Cha2ds2VascComponent;
  let fixture: ComponentFixture<Cha2ds2VascComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cha2ds2VascComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cha2ds2VascComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
