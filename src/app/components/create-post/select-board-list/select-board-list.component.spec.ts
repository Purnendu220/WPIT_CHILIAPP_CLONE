import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoardListComponent } from './select-board-list.component';

describe('SelectBoardListComponent', () => {
  let component: SelectBoardListComponent;
  let fixture: ComponentFixture<SelectBoardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBoardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
