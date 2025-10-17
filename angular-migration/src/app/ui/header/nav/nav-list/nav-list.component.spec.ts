import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavListComponent } from './nav-list.component';
import { NavItem } from '../nav.component';

describe('NavListComponent', () => {
  let component: NavListComponent;
  let fixture: ComponentFixture<NavListComponent>;

  const mockItems: readonly NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
