import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawStarComponent } from './draw-star.component';

describe('DrawStarComponent', () => {
  let component: DrawStarComponent;
  let fixture: ComponentFixture<DrawStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
