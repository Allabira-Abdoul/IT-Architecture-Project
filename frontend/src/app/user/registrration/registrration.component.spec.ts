import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrrationComponent } from './registrration.component';

describe('RegistrrationComponent', () => {
  let component: RegistrrationComponent;
  let fixture: ComponentFixture<RegistrrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
