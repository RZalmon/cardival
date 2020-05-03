import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCmpComponent } from './board-cmp.component';

describe('BoardCmpComponent', () => {
  let component: BoardCmpComponent;
  let fixture: ComponentFixture<BoardCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
