import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroVisualComponent } from './hero-visual.component';

describe('HeroVisualComponent', () => {
  let component: HeroVisualComponent;
  let fixture: ComponentFixture<HeroVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroVisualComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tech icons', () => {
    const techIcons = fixture.nativeElement.querySelectorAll('.floating-tech');
    expect(techIcons.length).toBe(6);
  });

  it('should render center tech', () => {
    const centerTech = fixture.nativeElement.querySelector('.center-tech');
    expect(centerTech).toBeTruthy();
  });
});
