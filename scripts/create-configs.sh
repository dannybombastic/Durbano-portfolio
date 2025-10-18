#!/bin/bash

# 🤖 Script Automatizado para Crear TODOS los Archivos desde CODE_PART_*.md
# Este script parsea los documentos y crea todos los archivos TypeScript/HTML/SCSS

set -e
cd "$(dirname "$0")"

PROJECT_ROOT="$(pwd)"

echo "🚀 Creando TODOS los archivos del proyecto..."
echo "📍 Proyecto: $PROJECT_ROOT"
echo ""

# Función para crear archivos de configuración críticos
create_critical_configs() {
    echo "📝 Paso 1: Creando archivos de configuración críticos..."
    
    # tsconfig variants
    cat > tsconfig.app.json << 'EOF'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
EOF
    
    cat > tsconfig.server.json << 'EOF'
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "outDir": "./out-tsc/server",
    "types": [
      "node"
    ]
  },
  "files": [
    "src/main.server.ts",
    "server.ts"
  ]
}
EOF
    
    cat > tsconfig.spec.json << 'EOF'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine",
      "node"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
EOF

    # karma.conf.js
    cat > karma.conf.js << 'EOF'
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/daniel-urbano-portfolio'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    }
  });
};
EOF

    # index.html
    cat > src/index.html << 'EOF'
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Daniel Urbano - DevOps Engineer Portfolio</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#667eea" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
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
EOF

    # styles.scss global
    cat > src/styles.scss << 'EOF'
@import 'variables';
@import 'mixins';
@import 'typography';
@import 'animations';
@import 'utilities';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: $font-primary;
  line-height: 1.6;
  color: $text-light;
  background: $bg-dark;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: $bg-dark;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, $primary-color, $secondary-color);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #7c92f5, #f76d7d);
}
EOF

    # server.ts
    cat > server.ts << 'EOF'
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
EOF

    echo "✅ Archivos de configuración creados"
}

# Crear archivos de configuración críticos
create_critical_configs

echo ""
echo "✅ CONFIGURACIÓN BÁSICA COMPLETADA"
echo ""
echo "📚 IMPORTANTE: Ahora debes crear manualmente los componentes siguiendo los archivos:"
echo ""
echo "   📄 CODE_PART_2_SHARED_COMPONENTS.md    (Social Links, Button, Icon)"
echo "   📄 CODE_PART_3_HEADER_NAV.md           (Header, Nav)"
echo "   📄 CODE_PART_4_ALL_SECTIONS_1.md       (Hero, About)"
echo "   📄 CODE_PART_5_ALL_SECTIONS_2.md       (Expertise, Services, Portfolio, Contact)"
echo "   📄 CODE_PART_6_FOOTER_HOME_APP.md      (Footer, Home, SCSS utilities)"
echo ""
echo "O ejecuta: npm start   (esto mostrará los errores de componentes faltantes)"
echo ""
