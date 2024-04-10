import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWithRoleComponent } from './users-with-role.component';

describe('UsersWithRoleComponent', () => {
  let component: UsersWithRoleComponent;
  let fixture: ComponentFixture<UsersWithRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersWithRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersWithRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
