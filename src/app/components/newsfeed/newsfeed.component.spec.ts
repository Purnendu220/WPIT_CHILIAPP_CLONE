import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedComponent } from './newsfeed.component';

describe('NewsFeedComponent', () => {
  let component: NewsFeedComponent;
  let fixture: ComponentFixture<NewsFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
