import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHome } from './auth-home';

describe('AuthHome', () => {
  let component: AuthHome;
  let fixture: ComponentFixture<AuthHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthHome],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
