import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowAlertToastComponent } from './show-alert-toast.component';


describe('ShowErrorToastComponent', () => {
  let component: ShowAlertToastComponent;
  let fixture: ComponentFixture<ShowAlertToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAlertToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAlertToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
