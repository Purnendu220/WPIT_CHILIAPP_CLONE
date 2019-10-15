import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonConfirmationPopupComponent } from './common-confirmation-popup.component';

describe('CommonConfirmationPopupComponent', () => {
  let component: CommonConfirmationPopupComponent;
  let fixture: ComponentFixture<CommonConfirmationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonConfirmationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
