import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapiesPageComponent } from './therapies-page.component';

describe('TherapiesPageComponent', () => {
  let component: TherapiesPageComponent;
  let fixture: ComponentFixture<TherapiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapiesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
