import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservateComponent } from './reservate.component';

describe('ReservateComponent', () => {
  let component: ReservateComponent;
  let fixture: ComponentFixture<ReservateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
