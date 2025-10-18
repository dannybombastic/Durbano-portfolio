import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SeoService } from '@app/core/services/seo.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let seoService: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const seoSpy = jasmine.createSpyObj('SeoService', ['setMetaTags']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: SeoService, useValue: seoSpy }],
    }).compileComponents();

    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seoService.setMetaTags on init', () => {
    fixture.detectChanges();
    expect(seoService.setMetaTags).toHaveBeenCalled();
  });
});
