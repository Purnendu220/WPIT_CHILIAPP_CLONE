import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerUserListComponent } from './explorer-user-list.component';

describe('CreatePostComponent', () => {
  let component: ExplorerUserListComponent;
  let fixture: ComponentFixture<ExplorerUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
