import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentiminetosComponent } from './sentiminetos.component';

describe('SentiminetosComponent', () => {
  let component: SentiminetosComponent;
  let fixture: ComponentFixture<SentiminetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentiminetosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentiminetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
