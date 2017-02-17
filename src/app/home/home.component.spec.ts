import { TestBed, async } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the home component', async(() => {
    let fixture = TestBed.createComponent(HomeComponent);
    let homeComponent = fixture.debugElement.componentInstance;
    expect(homeComponent).toBeTruthy();
  }));

  it(`should have as title 'Welcome to the home page!'`, async(() => {
    let fixture = TestBed.createComponent(HomeComponent);
    let homeComponent = fixture.debugElement.componentInstance;
    expect(homeComponent.title).toEqual('Welcome to the home page!');
  }));

  
});
