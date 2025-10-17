# 🚀 Migración de Portfolio HTML a Angular 20 con SSR

## 📁 Estructura de Directorios

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── expertise.interface.ts
│   │   │   ├── service.interface.ts
│   │   │   ├── project.interface.ts
│   │   │   ├── stat.interface.ts
│   │   │   ├── social-link.interface.ts
│   │   │   └── contact-info.interface.ts
│   │   ├── services/
│   │   │   ├── seo.service.ts
│   │   │   └── analytics.service.ts
│   │   └── constants/
│   │       └── portfolio-data.ts
│   ├── ui/
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html
│   │   │   ├── header.component.scss
│   │   │   └── header.component.spec.ts
│   │   ├── nav/
│   │   │   ├── nav.component.ts
│   │   │   ├── nav.component.html
│   │   │   ├── nav.component.scss
│   │   │   ├── nav.component.spec.ts
│   │   │   ├── nav-list/
│   │   │   │   ├── nav-list.component.ts
│   │   │   │   ├── nav-list.component.html
│   │   │   │   ├── nav-list.component.scss
│   │   │   │   └── nav-list.component.spec.ts
│   │   │   └── nav-item/
│   │   │       ├── nav-item.component.ts
│   │   │       ├── nav-item.component.html
│   │   │       ├── nav-item.component.scss
│   │   │       └── nav-item.component.spec.ts
│   │   ├── hero/
│   │   │   ├── hero.component.ts
│   │   │   ├── hero.component.html
│   │   │   ├── hero.component.scss
│   │   │   ├── hero.component.spec.ts
│   │   │   ├── hero-content/
│   │   │   │   ├── hero-content.component.ts
│   │   │   │   ├── hero-content.component.html
│   │   │   │   ├── hero-content.component.scss
│   │   │   │   └── hero-content.component.spec.ts
│   │   │   ├── hero-visual/
│   │   │   │   ├── hero-visual.component.ts
│   │   │   │   ├── hero-visual.component.html
│   │   │   │   ├── hero-visual.component.scss
│   │   │   │   └── hero-visual.component.spec.ts
│   │   │   └── scroll-indicator/
│   │   │       ├── scroll-indicator.component.ts
│   │   │       ├── scroll-indicator.component.html
│   │   │       ├── scroll-indicator.component.scss
│   │   │       └── scroll-indicator.component.spec.ts
│   │   ├── section-header/
│   │   │   ├── section-header.component.ts
│   │   │   ├── section-header.component.html
│   │   │   ├── section-header.component.scss
│   │   │   └── section-header.component.spec.ts
│   │   ├── about/
│   │   │   ├── about.component.ts
│   │   │   ├── about.component.html
│   │   │   ├── about.component.scss
│   │   │   ├── about.component.spec.ts
│   │   │   ├── skills-visualization/
│   │   │   │   ├── skills-visualization.component.ts
│   │   │   │   ├── skills-visualization.component.html
│   │   │   │   ├── skills-visualization.component.scss
│   │   │   │   └── skills-visualization.component.spec.ts
│   │   │   └── stats-grid/
│   │   │       ├── stats-grid.component.ts
│   │   │       ├── stats-grid.component.html
│   │   │       ├── stats-grid.component.scss
│   │   │       ├── stats-grid.component.spec.ts
│   │   │       └── stat-item/
│   │   │           ├── stat-item.component.ts
│   │   │           ├── stat-item.component.html
│   │   │           ├── stat-item.component.scss
│   │   │           └── stat-item.component.spec.ts
│   │   ├── expertise/
│   │   │   ├── expertise.component.ts
│   │   │   ├── expertise.component.html
│   │   │   ├── expertise.component.scss
│   │   │   ├── expertise.component.spec.ts
│   │   │   ├── expertise-grid/
│   │   │   │   ├── expertise-grid.component.ts
│   │   │   │   ├── expertise-grid.component.html
│   │   │   │   ├── expertise-grid.component.scss
│   │   │   │   └── expertise-grid.component.spec.ts
│   │   │   └── expertise-card/
│   │   │       ├── expertise-card.component.ts
│   │   │       ├── expertise-card.component.html
│   │   │       ├── expertise-card.component.scss
│   │   │       └── expertise-card.component.spec.ts
│   │   ├── services/
│   │   │   ├── services.component.ts
│   │   │   ├── services.component.html
│   │   │   ├── services.component.scss
│   │   │   ├── services.component.spec.ts
│   │   │   ├── service-grid/
│   │   │   │   ├── service-grid.component.ts
│   │   │   │   ├── service-grid.component.html
│   │   │   │   ├── service-grid.component.scss
│   │   │   │   └── service-grid.component.spec.ts
│   │   │   └── service-card/
│   │   │       ├── service-card.component.ts
│   │   │       ├── service-card.component.html
│   │   │       ├── service-card.component.scss
│   │   │       └── service-card.component.spec.ts
│   │   ├── portfolio/
│   │   │   ├── portfolio.component.ts
│   │   │   ├── portfolio.component.html
│   │   │   ├── portfolio.component.scss
│   │   │   ├── portfolio.component.spec.ts
│   │   │   ├── portfolio-grid/
│   │   │   │   ├── portfolio-grid.component.ts
│   │   │   │   ├── portfolio-grid.component.html
│   │   │   │   ├── portfolio-grid.component.scss
│   │   │   │   └── portfolio-grid.component.spec.ts
│   │   │   └── portfolio-project/
│   │   │       ├── portfolio-project.component.ts
│   │   │       ├── portfolio-project.component.html
│   │   │       ├── portfolio-project.component.scss
│   │   │       └── portfolio-project.component.spec.ts
│   │   ├── contact/
│   │   │   ├── contact.component.ts
│   │   │   ├── contact.component.html
│   │   │   ├── contact.component.scss
│   │   │   ├── contact.component.spec.ts
│   │   │   ├── contact-info/
│   │   │   │   ├── contact-info.component.ts
│   │   │   │   ├── contact-info.component.html
│   │   │   │   ├── contact-info.component.scss
│   │   │   │   └── contact-info.component.spec.ts
│   │   │   ├── contact-card/
│   │   │   │   ├── contact-card.component.ts
│   │   │   │   ├── contact-card.component.html
│   │   │   │   ├── contact-card.component.scss
│   │   │   │   └── contact-card.component.spec.ts
│   │   │   └── contact-visual/
│   │   │       ├── contact-visual.component.ts
│   │   │       ├── contact-visual.component.html
│   │   │       ├── contact-visual.component.scss
│   │   │       └── contact-visual.component.spec.ts
│   │   ├── footer/
│   │   │   ├── footer.component.ts
│   │   │   ├── footer.component.html
│   │   │   ├── footer.component.scss
│   │   │   └── footer.component.spec.ts
│   │   └── shared/
│   │       ├── social-links/
│   │       │   ├── social-links.component.ts
│   │       │   ├── social-links.component.html
│   │       │   ├── social-links.component.scss
│   │       │   ├── social-links.component.spec.ts
│   │       │   └── social-link/
│   │       │       ├── social-link.component.ts
│   │       │       ├── social-link.component.html
│   │       │       ├── social-link.component.scss
│   │       │       └── social-link.component.spec.ts
│   │       ├── button/
│   │       │   ├── button.component.ts
│   │       │   ├── button.component.html
│   │       │   ├── button.component.scss
│   │       │   └── button.component.spec.ts
│   │       └── icon/
│   │           ├── icon.component.ts
│   │           ├── icon.component.html
│   │           ├── icon.component.scss
│   │           └── icon.component.spec.ts
│   ├── pages/
│   │   └── home/
│   │       ├── home.component.ts
│   │       ├── home.component.html
│   │       ├── home.component.scss
│   │       └── home.component.spec.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.config.ts
│   ├── app.config.server.ts
│   └── app.routes.ts
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _typography.scss
│   ├── _animations.scss
│   ├── _utilities.scss
│   └── styles.scss
├── assets/
│   ├── img/
│   └── fonts/
├── index.html
├── main.ts
├── main.server.ts
└── styles.scss
```

## 🎯 Mapeo HTML → Componentes Angular

### Secciones Principales

| HTML Original | Componente Angular | Descripción |
|--------------|-------------------|-------------|
| `<header>` | `HeaderComponent` | Header fijo con logo y navegación |
| `<nav>` | `NavComponent` → `NavListComponent` + `NavItemComponent` | Navegación granular |
| `<section class="hero">` | `HeroComponent` → `HeroContentComponent` + `HeroVisualComponent` + `ScrollIndicatorComponent` | Hero con múltiples subcomponentes |
| `<section class="about">` | `AboutComponent` → `SkillsVisualizationComponent` + `StatsGridComponent` + `StatItemComponent` | About con visualización y estadísticas |
| `<section class="expertise">` | `ExpertiseComponent` → `ExpertiseGridComponent` + `ExpertiseCardComponent` | Expertise grid con cards |
| `<section class="services">` | `ServicesComponent` → `ServiceGridComponent` + `ServiceCardComponent` | Services grid con cards |
| `<section class="portfolio">` | `PortfolioComponent` → `PortfolioGridComponent` + `PortfolioProjectComponent` | Portfolio grid con proyectos |
| `<section class="contact">` | `ContactComponent` → `ContactInfoComponent` + `ContactCardComponent` + `ContactVisualComponent` | Sección de contacto |
| `<footer>` | `FooterComponent` | Footer con branding y social links |

### Componentes Compartidos

| Elemento HTML | Componente Shared | Reutilización |
|--------------|------------------|---------------|
| Social links | `SocialLinksComponent` + `SocialLinkComponent` | Hero, Footer, Contact |
| Buttons | `ButtonComponent` | Hero, Services, Portfolio |
| Section headers | `SectionHeaderComponent` | Todas las secciones |
| Icons | `IconComponent` | Todos los componentes |

## 🔧 Decisiones de Arquitectura

### 1. **Proyección de Contenido (`<ng-content>`)**
Cada componente define slots específicos para permitir inyección de contenido:

```typescript
// Ejemplo: HeroComponent
<ng-content select="[hero-title]"></ng-content>
<ng-content select="[hero-subtitle]"></ng-content>
<ng-content select="[hero-description]"></ng-content>
<ng-content select="[hero-cta]"></ng-content>
```

### 2. **Inputs Tipados**
Todos los @Input() usan interfaces TypeScript:

```typescript
export interface ExpertiseData {
  icon: string;
  title: string;
  description: string;
}
```

### 3. **OnPush Change Detection**
Todos los componentes usan `ChangeDetectionStrategy.OnPush` para optimizar rendimiento.

### 4. **Granularidad**
- **Lista + Item**: Listas separadas en componente "list" + componente "item"
- **Composición**: Componentes complejos descompuestos en subcomponentes
- **Reutilización**: Componentes shared para elementos comunes

## 📦 Dependencias

```json
{
  "dependencies": {
    "@angular/animations": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular/platform-server": "^20.0.0",
    "@angular/router": "^20.0.0",
    "@angular/ssr": "^20.0.0",
    "ngx-seo-helper": "^latest",
    "rxjs": "^7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "^0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular/cli": "^20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    "@angular-eslint/builder": "^latest",
    "@angular-eslint/eslint-plugin": "^latest",
    "@angular-eslint/eslint-plugin-template": "^latest",
    "@angular-eslint/schematics": "^latest",
    "@angular-eslint/template-parser": "^latest",
    "@types/jasmine": "^5.1.0",
    "@types/node": "^20.10.0",
    "@typescript-eslint/eslint-plugin": "^latest",
    "@typescript-eslint/parser": "^latest",
    "eslint": "^8.55.0",
    "eslint-config-prettier": "^latest",
    "eslint-plugin-prettier": "^latest",
    "jasmine-core": "^5.1.0",
    "karma": "^6.4.0",
    "karma-chrome-launcher": "^3.2.0",
    "karma-coverage": "^2.2.0",
    "karma-jasmine": "^5.1.0",
    "karma-jasmine-html-reporter": "^2.1.0",
    "prettier": "^latest",
    "typescript": "~5.6.0"
  }
}
```

## 🚀 Comandos de Ejecución

```bash
# Desarrollo con SSR
npm run dev:ssr

# Build para producción con SSR
npm run build:ssr

# Ejecutar servidor SSR
npm run serve:ssr:portfolio-angular

# Tests unitarios
npm test

# Linting
npm run lint

# Formateo con Prettier
npm run format
```

## 🎨 Estilos SCSS

Los estilos mantienen la estructura del CSS original pero organizados en:
- `_variables.scss`: Variables CSS personalizadas
- `_mixins.scss`: Mixins reutilizables
- `_typography.scss`: Tipografía
- `_animations.scss`: Animaciones
- `_utilities.scss`: Clases utilitarias

## 🔐 SEO Configuración

```typescript
// En HomeComponent ngOnInit()
this.seoService.setMetaTags({
  title: 'Daniel Urbano - DevOps Professional Portfolio',
  description: 'Passionate DevOps professional...',
  canonical: 'https://danielurbano.dev',
  openGraph: {
    title: 'Daniel Urbano - DevOps Engineer',
    type: 'website',
    url: 'https://danielurbano.dev',
    image: 'https://danielurbano.dev/assets/og-image.jpg',
    description: '...'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Urbano - DevOps Engineer',
    description: '...',
    image: 'https://danielurbano.dev/assets/twitter-image.jpg'
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daniel Urbano',
    jobTitle: 'DevOps Engineer',
    url: 'https://danielurbano.dev'
  }
});
```

## ✅ Checklist de Migración

- [x] Proyecto Angular 20 standalone
- [x] SSR habilitado
- [x] TypeScript estricto configurado
- [x] ngx-seo-helper integrado
- [x] Componentes granulares con <ng-content>
- [x] OnPush change detection
- [x] SCSS modular
- [x] Tests unitarios estructura
- [x] ESLint + Prettier
- [x] Interfaces TypeScript para todos los datos
- [x] Accesibilidad ARIA
- [x] Optimizaciones de rendimiento

## 📝 Notas Adicionales

1. **Google Tag Manager**: Mover a `index.html` del proyecto Angular
2. **Service Worker**: Generar con `ng add @angular/pwa`
3. **Imágenes**: Copiar todas de `/img` a `/assets/img`
4. **Fonts**: Mantener importación de Google Fonts en `styles.scss`
5. **Analytics**: Implementar en `AnalyticsService` usando GTM
6. **Typed.js**: Integrar como librería externa o implementar custom
7. **ScrollReveal**: Usar Angular animations o Intersection Observer API

---

**Próximos pasos**: Ver archivos de código completos en los siguientes documentos.