import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltraPaintComponent } from './altra-paint.component';

describe('AltraPaintComponent', () => {
  let component: AltraPaintComponent;
  let fixture: ComponentFixture<AltraPaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltraPaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltraPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
