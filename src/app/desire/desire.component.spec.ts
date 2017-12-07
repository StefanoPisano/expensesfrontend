import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesireComponent } from './desire.component';

describe('DesireComponent', () => {
  let component: DesireComponent;
  let fixture: ComponentFixture<DesireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
