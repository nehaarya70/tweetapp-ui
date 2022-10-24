import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTweetComponent } from './one-tweet.component';

describe('OneTweetComponent', () => {
  let component: OneTweetComponent;
  let fixture: ComponentFixture<OneTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
