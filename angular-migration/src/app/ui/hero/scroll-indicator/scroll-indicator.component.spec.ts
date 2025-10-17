import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewportScroller } from '@angular/common';
import { ScrollIndicatorComponent } from './scroll-indicator.component';

describe('ScrollIndicatorComponent', () => {
  let component: ScrollIndicatorComponent;
  let fixture: ComponentFixture<ScrollIndicatorComponent>;
  let viewportScroller: jasmine.SpyObj<ViewportScroller>;

  beforeEach(async () => {
    const scrollerSpy = jasmine.createSpyObj('ViewportScroller', [
      'scrollToAnchor',
    ]);

    await TestBed.configureTestingModule({
      imports: [ScrollIndicatorComponent],
      providers: [{ provide: ViewportScroller, useValue: scrollerSpy }],
    }).compileComponents();

    viewportScroller = TestBed.inject(
      ViewportScroller
    ) as jasmine.SpyObj<ViewportScroller>;
    fixture = TestBed.createComponent(ScrollIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to about section on click', () => {
    const indicator = fixture.nativeElement.querySelector('.scroll-indicator');
    indicator.click();
    expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith('about');
  });

  it('should toggle hover state', () => {
    const indicator = fixture.nativeElement.querySelector('.scroll-indicator');

    indicator.dispatchEvent(new MouseEvent('mouseenter'));
    expect(component['isHovered']()).toBe(true);

    indicator.dispatchEvent(new MouseEvent('mouseleave'));
    expect(component['isHovered']()).toBe(false);
  });
});
