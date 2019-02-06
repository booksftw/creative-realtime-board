import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameBackgroundComponent } from './frame-background.component';

describe('FrameBackgroundComponent', () => {
  let component: FrameBackgroundComponent;
  let fixture: ComponentFixture<FrameBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
