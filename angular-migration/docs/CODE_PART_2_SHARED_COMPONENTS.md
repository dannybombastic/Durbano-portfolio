# 📦 Código Completo - Parte 2: Shared Components

## 🔗 Social Links Component

### TypeScript (src/app/shared/components/social-links/social-links.component.ts)

```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLinkData } from '@app/core/models/social-link.interface';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  readonly links = input.required<readonly SocialLinkData[]>();
}
```

### HTML (src/app/shared/components/social-links/social-links.component.html)

```html
<div class="social-links">
  @for (link of links(); track link.url) {
    <a 
      [href]="link.url" 
      target="_blank" 
      rel="noopener noreferrer"
      [attr.aria-label]="link.label"
      class="social-link">
      <i [class]="'bx ' + link.icon"></i>
    </a>
  }
</div>
```

### SCSS (src/app/shared/components/social-links/social-links.component.scss)

```scss
@import 'variables';

.social-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: $text-light;
  font-size: 1.5rem;
  transition: $transition-smooth;

  &:hover {
    transform: translateY(-5px);
    background: $primary-gradient;
    box-shadow: $glow-primary;
  }
}
```

### Test (src/app/shared/components/social-links/social-links.component.spec.ts)

```typescript
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
```

## 🔘 Button Component

### TypeScript (src/app/shared/components/button/button.component.ts)

```typescript
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly icon = input<string | null>(null);
  
  readonly clicked = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
```

### HTML (src/app/shared/components/button/button.component.html)

```html
<button
  [class]="'btn btn-' + variant() + ' btn-' + size()"
  [class.btn-full-width]="fullWidth()"
  [disabled]="disabled()"
  (click)="handleClick($event)"
  type="button">
  @if (icon()) {
    <i [class]="'bx ' + icon()"></i>
  }
  <ng-content></ng-content>
</button>
```

### SCSS (src/app/shared/components/button/button.component.scss)

```scss
@import 'variables';

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: $font-primary;
  font-weight: 600;
  border: none;
  border-radius: $border-radius-sm;
  cursor: pointer;
  transition: $transition-smooth;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Sizes
  &-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  &-md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  &-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  // Variants
  &-primary {
    background: $primary-gradient;
    color: $text-light;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: $glow-primary;
    }
  }

  &-secondary {
    background: $secondary-gradient;
    color: $text-light;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 0 30px rgba(245, 87, 108, 0.3);
    }
  }

  &-outline {
    background: transparent;
    color: $primary-color;
    border: 2px solid $primary-color;

    &:hover:not(:disabled) {
      background: $primary-gradient;
      color: $text-light;
      border-color: transparent;
    }
  }

  &-ghost {
    background: transparent;
    color: $text-dark;

    &:hover:not(:disabled) {
      background: rgba(102, 126, 234, 0.1);
    }
  }

  &-full-width {
    width: 100%;
  }
}
```

### Test (src/app/shared/components/button/button.component.spec.ts)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when not disabled', () => {
    spyOn(component.clicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    spyOn(component.clicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });
});
```

## 🎯 Icon Component

### TypeScript (src/app/shared/components/icon/icon.component.ts)

```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input<string>('1.5rem');
  readonly color = input<string | null>(null);
}
```

### HTML (src/app/shared/components/icon/icon.component.html)

```html
<i 
  [class]="'bx ' + name()"
  [style.font-size]="size()"
  [style.color]="color()"></i>
```

### SCSS (src/app/shared/components/icon/icon.component.scss)

```scss
i {
  display: inline-block;
  line-height: 1;
}
```

### Test (src/app/shared/components/icon/icon.component.spec.ts)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'bx-check');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon with correct class', () => {
    const icon = fixture.nativeElement.querySelector('i');
    expect(icon.classList.contains('bx-check')).toBeTruthy();
  });
});
```

---

**Continúa en la siguiente parte con los componentes UI principales...**
