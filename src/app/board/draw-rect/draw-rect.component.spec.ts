import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawRectComponent } from './draw-rect.component';

describe('DrawRectComponent', () => {
  let component: DrawRectComponent;
  let fixture: ComponentFixture<DrawRectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawRectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
