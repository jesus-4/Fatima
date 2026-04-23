import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloresComponent } from './flores.component';

describe('FloresComponent', () => {
  let component: FloresComponent;
  let fixture: ComponentFixture<FloresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
