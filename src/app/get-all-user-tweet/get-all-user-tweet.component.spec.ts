import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllUserTweetComponent } from './get-all-user-tweet.component';

describe('GetAllUserTweetComponent', () => {
  let component: GetAllUserTweetComponent;
  let fixture: ComponentFixture<GetAllUserTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllUserTweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllUserTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
