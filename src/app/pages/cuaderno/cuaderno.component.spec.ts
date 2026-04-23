import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadernoComponent } from './cuaderno.component';

describe('CuadernoComponent', () => {
  let component: CuadernoComponent;
  let fixture: ComponentFixture<CuadernoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuadernoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuadernoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
