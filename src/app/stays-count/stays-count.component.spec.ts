import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaysCountComponent } from './stays-count.component';

describe('StaysCountComponent', () => {
  let component: StaysCountComponent;
  let fixture: ComponentFixture<StaysCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaysCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaysCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
