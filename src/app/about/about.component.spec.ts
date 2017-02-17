import { TestBed, async } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AboutComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent
      ],
      imports:[
          RouterTestingModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the about component', async(() => {
    let fixture = TestBed.createComponent(AboutComponent);
    let aboutComponent = fixture.debugElement.componentInstance;
    expect(aboutComponent).toBeTruthy();
  }));

  it(`should have as title 'About Page!'`, async(() => {
    let fixture = TestBed.createComponent(AboutComponent);
    let aboutComponent = fixture.debugElement.componentInstance;
    expect(aboutComponent.title).toEqual('About Page!');
  }));

  
});
