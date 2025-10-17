# 📦 Código Completo - Parte 3: Header & Navigation Components

## 📱 Header Component

### TypeScript (src/app/ui/header/header.component.ts)

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SOCIAL_LINKS } from '@app/core/constants/portfolio-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
```

### HTML (src/app/ui/header/header.component.html)

```html
<header class="header">
  <div class="container">
    <div class="header-content">
      <div class="logo">
        <span class="logo-text">Daniel</span>
        <span class="logo-highlight">Urbano</span>
      </div>
      <app-nav [socialLinks]="socialLinks"></app-nav>
    </div>
  </div>
</header>
```

### SCSS (src/app/ui/header/header.component.scss)

```scss
@import 'variables';
@import 'mixins';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  transition: $transition-smooth;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.logo-text {
  color: $text-light;
}

.logo-highlight {
  background: $primary-gradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@include responsive(md) {
  .header-content {
    padding: 1.5rem 0;
  }
}
```

### Test (src/app/ui/header/header.component.spec.ts)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo', () => {
    const logo = fixture.nativeElement.querySelector('.logo');
    expect(logo).toBeTruthy();
  });
});
```

## 🧭 Navigation Component

### TypeScript (src/app/ui/header/nav/nav.component.ts)

```typescript
import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { SocialLinksComponent } from '@app/shared/components/social-links/social-links.component';
import { SocialLinkData } from '@app/core/models/social-link.interface';

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavListComponent, SocialLinksComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  readonly socialLinks = input.required<readonly SocialLinkData[]>();
  readonly isMenuOpen = signal(false);

  readonly navItems: readonly NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ] as const;

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
```

### HTML (src/app/ui/header/nav/nav.component.html)

```html
<nav class="nav">
  <button 
    class="menu-toggle"
    [class.active]="isMenuOpen()"
    (click)="toggleMenu()"
    aria-label="Toggle menu">
    <span class="menu-icon"></span>
  </button>

  <div class="nav-content" [class.open]="isMenuOpen()">
    <app-nav-list 
      [items]="navItems" 
      (itemClicked)="closeMenu()">
    </app-nav-list>
    <div class="nav-social">
      <app-social-links [links]="socialLinks()"></app-social-links>
    </div>
  </div>
</nav>
```

### SCSS (src/app/ui/header/nav/nav.component.scss)

```scss
@import 'variables';
@import 'mixins';

.nav {
  display: flex;
  align-items: center;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  .menu-icon {
    position: relative;
    width: 25px;
    height: 2px;
    background: $text-light;
    transition: $transition-smooth;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: $text-light;
      transition: $transition-smooth;
    }

    &::before {
      top: -8px;
    }

    &::after {
      bottom: -8px;
    }
  }

  &.active .menu-icon {
    background: transparent;

    &::before {
      top: 0;
      transform: rotate(45deg);
    }

    &::after {
      bottom: 0;
      transform: rotate(-45deg);
    }
  }
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-social {
  display: none;
}

@include responsive(lg, 'max') {
  .menu-toggle {
    display: flex;
  }

  .nav-content {
    position: fixed;
    top: 70px;
    right: 0;
    width: 300px;
    height: calc(100vh - 70px);
    background: rgba(26, 32, 44, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    gap: 2rem;
    transform: translateX(100%);
    transition: $transition-smooth;

    &.open {
      transform: translateX(0);
    }
  }

  .nav-social {
    display: block;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}
```

### Test (src/app/ui/header/nav/nav.component.spec.ts)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { SocialLinkData } from '@app/core/models/social-link.interface';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  const mockSocialLinks: readonly SocialLinkData[] = [
    { icon: 'bxl-github', url: 'https://github.com/test', label: 'GitHub' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('socialLinks', mockSocialLinks);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    expect(component.isMenuOpen()).toBe(false);
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);
  });
});
```

## 📋 Nav List Component

### TypeScript (src/app/ui/header/nav/nav-list/nav-list.component.ts)

```typescript
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavItem } from '../nav.component';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [CommonModule, NavItemComponent],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListComponent {
  readonly items = input.required<readonly NavItem[]>();
  readonly itemClicked = output<void>();

  handleItemClick(): void {
    this.itemClicked.emit();
  }
}
```

### HTML (src/app/ui/header/nav/nav-list/nav-list.component.html)

```html
<ul class="nav-list">
  @for (item of items(); track item.href) {
    <app-nav-item 
      [item]="item" 
      (clicked)="handleItemClick()">
    </app-nav-item>
  }
</ul>
```

### SCSS (src/app/ui/header/nav/nav-list/nav-list.component.scss)

```scss
@import 'variables';
@import 'mixins';

.nav-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

@include responsive(lg, 'max') {
  .nav-list {
    flex-direction: column;
    width: 100%;
    gap: 0;
  }
}
```

### Test (src/app/ui/header/nav/nav-list/nav-list.component.spec.ts)

```typescript
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
```

## 🔗 Nav Item Component

### TypeScript (src/app/ui/header/nav/nav-list/nav-item/nav-item.component.ts)

```typescript
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '../../nav.component';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  readonly item = input.required<NavItem>();
  readonly clicked = output<void>();

  handleClick(event: Event): void {
    event.preventDefault();
    const target = document.querySelector(this.item().href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      this.clicked.emit();
    }
  }
}
```

### HTML (src/app/ui/header/nav/nav-list/nav-item/nav-item.component.html)

```html
<li class="nav-item">
  <a 
    [href]="item().href" 
    (click)="handleClick($event)"
    class="nav-link">
    {{ item().label }}
  </a>
</li>
```

### SCSS (src/app/ui/header/nav/nav-list/nav-item/nav-item.component.scss)

```scss
@import 'variables';
@import 'mixins';

.nav-item {
  position: relative;
}

.nav-link {
  display: block;
  color: $text-light;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: $transition-smooth;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: $primary-gradient;
    transition: $transition-smooth;
  }

  &:hover {
    color: $primary-color;

    &::after {
      width: 100%;
    }
  }
}

@include responsive(lg, 'max') {
  .nav-link {
    padding: 1rem 0;
    font-size: 1.125rem;
  }
}
```

### Test (src/app/ui/header/nav/nav-list/nav-item/nav-item.component.spec.ts)

```typescript
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
```

---

**Continúa en la siguiente parte con Hero y About components...**
