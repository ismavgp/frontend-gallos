import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangePage } from './password-change-page';

describe('PasswordChangePage', () => {
  let component: PasswordChangePage;
  let fixture: ComponentFixture<PasswordChangePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordChangePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordChangePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
