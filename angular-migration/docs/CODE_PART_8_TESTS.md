# 📦 Código Completo - TESTS: Tests para Todos los Componentes

## 🧪 Tests de Core Services

### SEO Service Test (src/app/core/services/seo.service.spec.ts)
```typescript
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService, SeoMetaTags } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let metaSpy: jasmine.SpyObj<Meta>;
  let titleSpy: jasmine.SpyObj<Title>;

  beforeEach(() => {
    const metaSpyObj = jasmine.createSpyObj('Meta', ['updateTag']);
    const titleSpyObj = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Meta, useValue: metaSpyObj },
        { provide: Title, useValue: titleSpyObj },
      ],
    });

    service = TestBed.inject(SeoService);
    metaSpy = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
    titleSpy = TestBed.inject(Title) as jasmine.SpyObj<Title>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set title', () => {
    const config: SeoMetaTags = {
      title: 'Test Title',
      description: 'Test Description',
      canonical: 'https://test.com',
    };

    service.setMetaTags(config);
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Test Title');
  });

  it('should set basic meta tags', () => {
    const config: SeoMetaTags = {
      title: 'Test',
      description: 'Test Desc',
      canonical: 'https://test.com',
    };

    service.setMetaTags(config);
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Test Desc',
    });
  });
});
```

### Analytics Service Test (src/app/core/services/analytics.service.spec.ts)
```typescript
import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsService);

    // Mock window.dataLayer
    (window as any).dataLayer = [];
  });

  afterEach(() => {
    delete (window as any).dataLayer;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track event', () => {
    service.trackEvent('test_event', { param: 'value' });
    expect((window as any).dataLayer.length).toBe(1);
    expect((window as any).dataLayer[0]).toEqual({
      event: 'test_event',
      param: 'value',
    });
  });

  it('should track page view', () => {
    service.trackPageView('/test', 'Test Page');
    expect((window as any).dataLayer[0].event).toBe('page_view');
  });

  it('should handle missing dataLayer gracefully', () => {
    delete (window as any).dataLayer;
    expect(() => service.trackEvent('test', {})).not.toThrow();
  });
});
```

---

## 🧪 Tests de UI Components (Ejemplos adicionales)

### Hero Visual Test (src/app/ui/hero/hero-visual/hero-visual.component.spec.ts)
```typescript
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

  it('should render profile image', () => {
    const img = fixture.nativeElement.querySelector('.profile-image');
    expect(img).toBeTruthy();
    expect(img.alt).toBe('Daniel Urbano');
  });

  it('should render floating icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.icon');
    expect(icons.length).toBe(4);
  });
});
```

### Scroll Indicator Test (src/app/ui/hero/scroll-indicator/scroll-indicator.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollIndicatorComponent } from './scroll-indicator.component';

describe('ScrollIndicatorComponent', () => {
  let component: ScrollIndicatorComponent;
  let fixture: ComponentFixture<ScrollIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render scroll indicator', () => {
    const indicator = fixture.nativeElement.querySelector('.scroll-indicator');
    expect(indicator).toBeTruthy();
  });

  it('should call scrollToNext when clicked', () => {
    spyOn(component, 'scrollToNext');
    const indicator = fixture.nativeElement.querySelector('.scroll-indicator');
    indicator.click();
    expect(component.scrollToNext).toHaveBeenCalled();
  });
});
```

### Skills Visualization Test (src/app/ui/about/skills-visualization/skills-visualization.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsVisualizationComponent } from './skills-visualization.component';

describe('SkillsVisualizationComponent', () => {
  let component: SkillsVisualizationComponent;
  let fixture: ComponentFixture<SkillsVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsVisualizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 6 skill circles', () => {
    const circles = fixture.nativeElement.querySelectorAll('.skill-circle');
    expect(circles.length).toBe(6);
  });

  it('should render skill names', () => {
    const circles = fixture.nativeElement.querySelectorAll('.skill-circle span');
    const texts = Array.from(circles).map((el: any) => el.textContent);
    expect(texts).toContain('Docker');
    expect(texts).toContain('K8s');
  });
});
```

### Stats Grid Test (src/app/ui/about/stats-grid/stats-grid.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsGridComponent } from './stats-grid.component';
import { StatData } from '@app/core/models/stat.interface';

describe('StatsGridComponent', () => {
  let component: StatsGridComponent;
  let fixture: ComponentFixture<StatsGridComponent>;

  const mockStats: readonly StatData[] = [
    { number: '5+', label: 'Years' },
    { number: '50+', label: 'Projects' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('stats', mockStats);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of stat items', () => {
    const items = fixture.nativeElement.querySelectorAll('app-stat-item');
    expect(items.length).toBe(mockStats.length);
  });
});
```

### Expertise Grid Test (src/app/ui/expertise/expertise-grid/expertise-grid.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpertiseGridComponent } from './expertise-grid.component';
import { ExpertiseData } from '@app/core/models/expertise.interface';

describe('ExpertiseGridComponent', () => {
  let component: ExpertiseGridComponent;
  let fixture: ComponentFixture<ExpertiseGridComponent>;

  const mockItems: readonly ExpertiseData[] = [
    { icon: 'bx-test', title: 'Test', description: 'Test desc' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpertiseGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render expertise cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-expertise-card');
    expect(cards.length).toBe(mockItems.length);
  });
});
```

### Expertise Card Test (src/app/ui/expertise/expertise-grid/expertise-card/expertise-card.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpertiseCardComponent } from './expertise-card.component';
import { ExpertiseData } from '@app/core/models/expertise.interface';

describe('ExpertiseCardComponent', () => {
  let component: ExpertiseCardComponent;
  let fixture: ComponentFixture<ExpertiseCardComponent>;

  const mockData: ExpertiseData = {
    icon: 'bx-test',
    title: 'Test Title',
    description: 'Test Description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpertiseCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const title = fixture.nativeElement.querySelector('.card-title');
    expect(title.textContent).toContain('Test Title');
  });

  it('should display description', () => {
    const desc = fixture.nativeElement.querySelector('.card-description');
    expect(desc.textContent).toContain('Test Description');
  });
});
```

### Service Grid Test (src/app/ui/services/service-grid/service-grid.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceGridComponent } from './service-grid.component';
import { ServiceData } from '@app/core/models/service.interface';

describe('ServiceGridComponent', () => {
  let component: ServiceGridComponent;
  let fixture: ComponentFixture<ServiceGridComponent>;

  const mockServices: readonly ServiceData[] = [
    {
      icon: 'bx-test',
      title: 'Test Service',
      description: 'Test',
      features: ['Feature 1'],
      serviceId: 'test',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('services', mockServices);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render service cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-service-card');
    expect(cards.length).toBe(mockServices.length);
  });
});
```

### Portfolio Grid Test (src/app/ui/portfolio/portfolio-grid/portfolio-grid.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioGridComponent } from './portfolio-grid.component';
import { ProjectData } from '@app/core/models/project.interface';

describe('PortfolioGridComponent', () => {
  let component: PortfolioGridComponent;
  let fixture: ComponentFixture<PortfolioGridComponent>;

  const mockProjects: readonly ProjectData[] = [
    {
      icon: 'bx-test',
      techStack: ['Tech1'],
      title: 'Test Project',
      description: 'Test',
      achievements: [],
      links: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('projects', mockProjects);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render project cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-portfolio-project');
    expect(cards.length).toBe(mockProjects.length);
  });
});
```

### Contact Info Test (src/app/ui/contact/contact-info/contact-info.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactInfoComponent } from './contact-info.component';
import { ContactCardData } from '@app/core/models/contact-info.interface';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;

  const mockCards: readonly ContactCardData[] = [
    {
      icon: 'bx-test',
      title: 'Test',
      description: 'Test Desc',
      linkText: 'Link',
      linkUrl: 'https://test.com',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cards', mockCards);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-contact-card');
    expect(cards.length).toBe(mockCards.length);
  });
});
```

### Contact Visual Test (src/app/ui/contact/contact-visual/contact-visual.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactVisualComponent } from './contact-visual.component';

describe('ContactVisualComponent', () => {
  let component: ContactVisualComponent;
  let fixture: ComponentFixture<ContactVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactVisualComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render illustration', () => {
    const illustration = fixture.nativeElement.querySelector('.illustration');
    expect(illustration).toBeTruthy();
  });

  it('should render 3 circles', () => {
    const circles = fixture.nativeElement.querySelectorAll('.circle');
    expect(circles.length).toBe(3);
  });
});
```

---

## 🎯 Test Template Genérico

Para cualquier componente que falte, usa este template:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentNameComponent } from './component-name.component';

describe('ComponentNameComponent', () => {
  let component: ComponentNameComponent;
  let fixture: ComponentFixture<ComponentNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentNameComponent],
      // Si tiene inputs, agregar:
      // providers: [...]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentNameComponent);
    component = fixture.componentInstance;
    
    // Si tiene inputs requeridos:
    // fixture.componentRef.setInput('inputName', mockValue);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests adicionales según funcionalidad:
  
  // Test de rendering
  it('should render main element', () => {
    const element = fixture.nativeElement.querySelector('.main-class');
    expect(element).toBeTruthy();
  });

  // Test de inputs
  it('should accept input', () => {
    fixture.componentRef.setInput('inputName', 'test value');
    fixture.detectChanges();
    expect(component.inputName()).toBe('test value');
  });

  // Test de outputs
  it('should emit event', () => {
    spyOn(component.outputName, 'emit');
    component.someMethod();
    expect(component.outputName.emit).toHaveBeenCalled();
  });

  // Test de user interactions
  it('should handle click', () => {
    spyOn(component, 'handleClick');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.handleClick).toHaveBeenCalled();
  });
});
```

---

## 📊 Comandos de Testing

```bash
# Ejecutar todos los tests
npm test

# Tests en modo CI (sin watch)
npm run test:ci

# Tests con coverage
ng test --code-coverage

# Tests de un archivo específico
ng test --include='**/component-name.component.spec.ts'

# Ver coverage report
open coverage/daniel-urbano-portfolio/index.html
```

---

## ✅ Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

---

## 🎯 Tests Prioritarios

### Alta Prioridad
1. ✅ SeoService (crítico para SEO)
2. ✅ AnalyticsService (tracking)
3. ✅ HomeComponent (SEO setup)
4. ✅ AppComponent (root)

### Media Prioridad
5. ✅ All UI Components (rendering)
6. ✅ Shared Components (reusabilidad)

### Baja Prioridad
7. Visual components (Hero, Contact Visual)
8. Pure presentational components

---

**Todos los tests documentados y listos para implementar!** 🎉
