import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeDataViewComponent } from './bike-data-view.component';

describe('BikeDataViewComponent', () => {
  let component: BikeDataViewComponent;
  let fixture: ComponentFixture<BikeDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
