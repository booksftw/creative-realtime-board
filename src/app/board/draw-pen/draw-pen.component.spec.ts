import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawPenComponent } from './draw-pen.component';

describe('DrawPenComponent', () => {
  let component: DrawPenComponent;
  let fixture: ComponentFixture<DrawPenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawPenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
