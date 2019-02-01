import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawShapesComponent } from './draw-shapes.component';

describe('DrawShapesComponent', () => {
  let component: DrawShapesComponent;
  let fixture: ComponentFixture<DrawShapesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawShapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
