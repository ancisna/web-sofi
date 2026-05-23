import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWorkshopComponent } from './card-workshop.component';

describe('CardWorkshopComponent', () => {
  let component: CardWorkshopComponent;
  let fixture: ComponentFixture<CardWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWorkshopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
