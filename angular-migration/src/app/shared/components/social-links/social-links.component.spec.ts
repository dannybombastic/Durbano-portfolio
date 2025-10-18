import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialLinksComponent } from './social-links.component';
import { SocialLinkData } from '@app/core/models/social-link.interface';

describe('SocialLinksComponent', () => {
  let component: SocialLinksComponent;
  let fixture: ComponentFixture<SocialLinksComponent>;

  const mockLinks: readonly SocialLinkData[] = [
    { icon: 'bxl-github', url: 'https://github.com/test', label: 'GitHub' },
    { icon: 'bxl-linkedin', url: 'https://linkedin.com/test', label: 'LinkedIn' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLinksComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('links', mockLinks);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all social links', () => {
    const links = fixture.nativeElement.querySelectorAll('.social-link');
    expect(links.length).toBe(mockLinks.length);
  });
});
