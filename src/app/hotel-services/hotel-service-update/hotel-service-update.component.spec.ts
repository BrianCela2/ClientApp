import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelServiceUpdateComponent } from './hotel-service-update.component';

describe('HotelServiceUpdateComponent', () => {
  let component: HotelServiceUpdateComponent;
  let fixture: ComponentFixture<HotelServiceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelServiceUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelServiceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
