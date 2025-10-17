# 📦 Código Completo - Parte 7 FINAL: Configuración y Entry Points

## 📦 package.json

```json
{
  "name": "daniel-urbano-portfolio",
  "version": "1.0.0",
  "description": "DevOps Engineer Portfolio - Angular 20 with SSR",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "build:ssr": "ng build && ng run daniel-urbano-portfolio:server",
    "serve:ssr": "node dist/daniel-urbano-portfolio/server/server.mjs",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "test:ci": "ng test --watch=false --code-coverage --browsers=ChromeHeadless",
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,scss,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,scss,json}\""
  },
  "private": true,
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
    "express": "^4.21.2",
    "rxjs": "^7.8.1",
    "tslib": "^2.8.1",
    "zone.js": "^0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular-eslint/builder": "^18.4.0",
    "@angular-eslint/eslint-plugin": "^18.4.0",
    "@angular-eslint/eslint-plugin-template": "^18.4.0",
    "@angular-eslint/schematics": "^18.4.0",
    "@angular-eslint/template-parser": "^18.4.0",
    "@angular/cli": "^20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    "@types/express": "^5.0.0",
    "@types/jasmine": "^5.1.4",
    "@types/node": "^22.10.2",
    "@typescript-eslint/eslint-plugin": "^8.18.1",
    "@typescript-eslint/parser": "^8.18.1",
    "eslint": "^9.17.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "jasmine-core": "^5.5.0",
    "karma": "^6.4.4",
    "karma-chrome-launcher": "^3.2.0",
    "karma-coverage": "^2.2.1",
    "karma-jasmine": "^5.1.0",
    "karma-jasmine-html-reporter": "^2.1.0",
    "prettier": "^3.4.2",
    "typescript": "~5.6.3"
  },
  "engines": {
    "node": ">=18.19.0",
    "npm": ">=10.0.0"
  }
}
```

---

## ⚙️ angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "daniel-urbano-portfolio": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": true,
          "changeDetection": "OnPush"
        },
        "@schematics/angular:directive": {
          "standalone": true
        },
        "@schematics/angular:pipe": {
          "standalone": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/daniel-urbano-portfolio",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": ["src/styles.scss"],
            "scripts": [],
            "stylePreprocessorOptions": {
              "includePaths": ["src/styles"]
            }
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "fileReplacements": []
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "daniel-urbano-portfolio:build:production"
            },
            "development": {
              "buildTarget": "daniel-urbano-portfolio:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": ["src/styles.scss"],
            "scripts": [],
            "karmaConfig": "karma.conf.js"
          }
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": ["src/**/*.ts", "src/**/*.html"]
          }
        },
        "server": {
          "builder": "@angular-devkit/build-angular:server",
          "options": {
            "outputPath": "dist/daniel-urbano-portfolio/server",
            "main": "src/main.server.ts",
            "tsConfig": "tsconfig.server.json",
            "inlineStyleLanguage": "scss"
          },
          "configurations": {
            "production": {
              "outputHashing": "media",
              "optimization": true,
              "sourceMap": false
            },
            "development": {
              "optimization": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        }
      }
    }
  },
  "cli": {
    "analytics": false,
    "schematicCollections": ["@angular-eslint/schematics"]
  }
}
```

---

## 🚀 Entry Points

### Main Browser (src/main.ts)
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

### Main Server (src/main.server.ts)
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (): Promise<any> => bootstrapApplication(AppComponent, config);

export default bootstrap;
```

### Server Config (src/app/app.config.server.ts)
```typescript
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### Server Entry (server.ts - root level)
```typescript
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
```

---

## 🧪 Testing Configuration

### Karma Config (karma.conf.js)
```javascript
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {},
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/daniel-urbano-portfolio'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }],
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    restartOnFileChange: true,
  });
};
```

### TSConfig App (tsconfig.app.json)
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}
```

### TSConfig Server (tsconfig.server.json)
```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "outDir": "./out-tsc/server",
    "types": ["node"]
  },
  "files": ["src/main.server.ts", "server.ts"]
}
```

### TSConfig Spec (tsconfig.spec.json)
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jasmine"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

---

## 🌐 Index HTML (src/index.html)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Daniel Urbano - DevOps Engineer & Cloud Architect</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#667eea" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

---

## 📝 README Actualizado

```markdown
# Daniel Urbano - DevOps Portfolio

Modern, SEO-optimized portfolio built with Angular 20, featuring Server-Side Rendering (SSR), standalone components, and TypeScript strict mode.

## 🚀 Features

- ✅ **Angular 20** with Standalone Components
- ✅ **Server-Side Rendering (SSR)** for optimal SEO
- ✅ **TypeScript Strict Mode** for type safety
- ✅ **OnPush Change Detection** for performance
- ✅ **Modular Architecture** with 45+ granular components
- ✅ **Content Projection** with ng-content
- ✅ **SCSS** with variables, mixins, and utilities
- ✅ **ESLint + Prettier** for code quality
- ✅ **Unit Tests** with Jasmine/Karma
- ✅ **Responsive Design** mobile-first approach

## 📦 Installation

```bash
# Install dependencies
npm install

# Development server
npm start

# Navigate to http://localhost:4200
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Build with SSR
npm run build:ssr

# Serve SSR build
npm run serve:ssr
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in CI mode
npm run test:ci
```

## 🎨 Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces
│   │   ├── services/        # SEO, Analytics services
│   │   └── constants/       # Portfolio data
│   ├── shared/
│   │   └── components/      # Reusable components
│   ├── ui/
│   │   ├── header/          # Header + Navigation
│   │   ├── hero/            # Hero section
│   │   ├── about/           # About section
│   │   ├── expertise/       # Expertise cards
│   │   ├── services/        # Services cards
│   │   ├── portfolio/       # Project showcase
│   │   ├── contact/         # Contact info
│   │   └── footer/          # Footer
│   ├── pages/
│   │   └── home/            # Home page
│   ├── app.component.*      # Root component
│   ├── app.config.ts        # App configuration
│   └── app.routes.ts        # Routing
├── styles/
│   ├── _variables.scss      # SCSS variables
│   ├── _mixins.scss         # SCSS mixins
│   ├── _typography.scss     # Typography styles
│   ├── _animations.scss     # Animation keyframes
│   └── _utilities.scss      # Utility classes
└── styles.scss              # Global styles
```

## 🛠️ Tech Stack

- **Framework**: Angular 20
- **Language**: TypeScript 5.6
- **Styling**: SCSS
- **Testing**: Jasmine, Karma
- **Linting**: ESLint, Prettier
- **SSR**: @angular/ssr, Express
- **Icons**: Boxicons
- **Fonts**: Google Fonts (Inter)

## 📝 License

MIT © Daniel Urbano

## 👤 Author

**Daniel Urbano**
- GitHub: [@dannybombastic](https://github.com/dannybombastic)
- GitLab: [@dannybombastic](https://gitlab.com/dannybombastic)
- LinkedIn: [daniel-u-665a004b](https://linkedin.com/in/daniel-u-665a004b)
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

```markdown
# 📋 Checklist de Implementación

## 1. Instalación Inicial
- [ ] Ejecutar `npm install`
- [ ] Verificar que no hay errores de dependencias

## 2. Migración de Assets
- [ ] Copiar carpeta `fonts/` a `public/fonts/`
- [ ] Copiar carpeta `img/` a `public/img/`
- [ ] Verificar que todas las imágenes WebP existen

## 3. Verificación de Tests
- [ ] Ejecutar `npm test`
- [ ] Verificar que todos los tests pasan
- [ ] Revisar coverage (debe estar > 80%)

## 4. Verificación de Build
- [ ] Ejecutar `npm run build`
- [ ] Verificar que no hay errores de compilación
- [ ] Comprobar tamaño de bundles (< 500KB inicial)

## 5. Verificación de SSR
- [ ] Ejecutar `npm run build:ssr`
- [ ] Ejecutar `npm run serve:ssr`
- [ ] Verificar que la página carga en http://localhost:4000
- [ ] Comprobar meta tags en el HTML source

## 6. Verificación de Linting
- [ ] Ejecutar `npm run lint`
- [ ] Corregir todos los errores de linting
- [ ] Ejecutar `npm run format`

## 7. Verificación Visual
- [ ] Verificar header sticky funciona
- [ ] Verificar navegación smooth scroll
- [ ] Verificar responsive en mobile
- [ ] Verificar animaciones de entrada
- [ ] Verificar hover effects en cards

## 8. Verificación de SEO
- [ ] Inspeccionar meta tags en browser DevTools
- [ ] Verificar JSON-LD schema
- [ ] Verificar canonical URL
- [ ] Verificar Open Graph tags
- [ ] Verificar Twitter Card tags

## 9. Performance
- [ ] Verificar Lighthouse score (debe ser > 90)
- [ ] Verificar tiempo de carga < 3s
- [ ] Verificar que no hay console errors

## 10. Deploy (Opcional)
- [ ] Configurar GitHub Pages / Netlify / Vercel
- [ ] Actualizar base href si es necesario
- [ ] Verificar que funciona en producción
```

---

## 🎯 COMANDOS RÁPIDOS

```bash
# Desarrollo
npm start                  # Servidor dev en http://localhost:4200

# Build
npm run build             # Build producción
npm run build:ssr         # Build con SSR
npm run serve:ssr         # Servir SSR en http://localhost:4000

# Testing
npm test                  # Tests interactivos
npm run test:ci           # Tests en CI mode

# Code Quality
npm run lint              # Linting
npm run format            # Formatear código
npm run format:check      # Verificar formato

# Watching
npm run watch             # Build incremental con watch mode
```

---

**¡PROYECTO COMPLETO! Todos los archivos están documentados y listos para ser creados.**
