import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUsageComponent } from './service-usage.component';

describe('ServiceUsageComponent', () => {
  let component: ServiceUsageComponent;
  let fixture: ComponentFixture<ServiceUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceUsageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
