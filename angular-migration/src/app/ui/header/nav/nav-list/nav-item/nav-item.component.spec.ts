import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavItemComponent } from './nav-item.component';
import { NavItem } from '../../nav.component';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  const mockItem: NavItem = { label: 'Test', href: '#test' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', mockItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nav link', () => {
    const link = fixture.nativeElement.querySelector('.nav-link');
    expect(link.textContent.trim()).toBe('Test');
  });
});
