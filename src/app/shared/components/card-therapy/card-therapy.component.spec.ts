import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTherapyComponent } from './card-therapy.component';

describe('CardTherapyComponent', () => {
  let component: CardTherapyComponent;
  let fixture: ComponentFixture<CardTherapyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTherapyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTherapyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
