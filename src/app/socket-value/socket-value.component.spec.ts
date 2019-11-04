import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketValueComponent } from './socket-value.component';

describe('SocketValueComponent', () => {
  let component: SocketValueComponent;
  let fixture: ComponentFixture<SocketValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
