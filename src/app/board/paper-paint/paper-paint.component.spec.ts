import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperPaintComponent } from './paper-paint.component';

describe('PaperPaintComponent', () => {
  let component: PaperPaintComponent;
  let fixture: ComponentFixture<PaperPaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperPaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
