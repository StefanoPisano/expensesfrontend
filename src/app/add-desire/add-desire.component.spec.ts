import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesireComponent } from './add-desire.component';

describe('AddDesireComponent', () => {
  let component: AddDesireComponent;
  let fixture: ComponentFixture<AddDesireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDesireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
