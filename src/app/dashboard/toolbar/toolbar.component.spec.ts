import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        MatToolbarModule,
        MatIconModule
      ]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
