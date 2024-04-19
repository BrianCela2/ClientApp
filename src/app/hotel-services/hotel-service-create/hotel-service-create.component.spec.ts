import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelServiceCreateComponent } from './hotel-service-create.component';

describe('HotelServiceCreateComponent', () => {
  let component: HotelServiceCreateComponent;
  let fixture: ComponentFixture<HotelServiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelServiceCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelServiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
