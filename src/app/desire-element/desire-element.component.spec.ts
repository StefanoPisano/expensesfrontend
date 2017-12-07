import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesireElementComponent } from './desire-element.component';

describe('DesireElementComponent', () => {
  let component: DesireElementComponent;
  let fixture: ComponentFixture<DesireElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesireElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesireElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
