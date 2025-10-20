# 🚀 Daniel Urbano - DevOps Engineer Portfolio

[![Deploy Status](https://img.shields.io/badge/deploy-automated-brightgreen?logo=github-actions)](https://github.com/dannybombastic/Durbano-portfolio/actions)
[![Angular](https://img.shields.io/badge/Angular-18+-red?logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> 🌐 **Live:** [durbanod.com](https://durbanod.com)

Portfolio profesional de un Azure DevOps Engineer especializado en CI/CD, Kubernetes, Docker y Cloud Infrastructure. Construido con Angular 18+ y las últimas tecnologías web.

---

## ✨ Características Principales

### 🎨 **Diseño Moderno & Responsive**
- UI/UX profesional con animaciones fluidas
- Totalmente responsive (Desktop, Tablet, Mobile)
- Dark mode con gradientes modernos
- Animaciones CSS personalizadas

### 🔍 **SEO Optimizado**
- Meta tags dinámicos (Open Graph, Twitter Cards)
- Sitemap.xml automático
- JSON-LD Schema markup (Person, Blog, BlogPosting)
- Robots.txt configurado
- Canonical URLs

### ⚡ **Performance**
- Server-Side Rendering (SSR) con Angular Universal
- Lazy loading de módulos
- Optimización de imágenes (WebP)
- Cache estratégico con Nginx
- Lighthouse score: 90+

### 📱 **Tecnologías**
- **Frontend:** Angular 18+ (Standalone Components, Signals)
- **Styling:** SCSS + Custom Design System
- **Backend:** n8n (Automation & Blog CMS)
- **Deployment:** Docker + Nginx Proxy Manager
- **CI/CD:** GitHub Actions
- **Hosting:** VPS con SSL (Let's Encrypt)

---

## 📄 Páginas & Secciones

### 🏠 **Home** (`/`)
Página principal con todas las secciones integradas:

#### 🎯 **Hero Section**
- Presentación impactante con call-to-action
- Animación de degradado en el título
- Botones de navegación rápida

#### 👨‍💻 **About Me**
- Biografía profesional
- Valores y filosofía de trabajo
- Imagen de perfil optimizada

#### 💡 **Expertise**
Áreas de especialización:
- **DevOps & CI/CD:** GitLab CI, GitHub Actions, Jenkins
- **Cloud Platforms:** Azure, AWS, GCP
- **Container Orchestration:** Kubernetes, Docker Swarm
- **Infrastructure as Code:** Terraform, Ansible
- **Monitoring:** Prometheus, Grafana, ELK Stack

#### 🛠️ **Services**
Servicios profesionales ofrecidos:
- CI/CD Pipeline Design & Implementation
- Cloud Infrastructure Architecture
- Container Orchestration & Migration
- DevOps Consulting & Training
- Infrastructure Automation

#### 💼 **Portfolio**
Proyectos destacados:
- Sistema de CI/CD empresarial
- Migración a Kubernetes
- Infraestructura como código
- Automatización de despliegues
- Cada proyecto con descripción, tecnologías y enlaces

#### 📧 **Contact**
- Formulario de contacto funcional
- Enlaces a redes sociales:
  - 🐙 [GitHub](https://github.com/dannybombastic)
  - 🦊 [GitLab](https://gitlab.com/dannybombastic)
  - 💼 [LinkedIn](https://linkedin.com/in/daniel-u-665a004b)
- Email directo

---

### 📚 **Blog** (`/blog`)

Sistema de Technical Blog integrado con n8n:

#### ✨ Características del Blog
- **CMS Headless:** Posts gestionados desde n8n Data Table
- **Paginación:** 10 posts por página (configurable)
- **Búsqueda semántica:** Encuentra posts fácilmente
- **Categorías/Tags:** Filtrado por temas
- **Tiempo de lectura:** Calculado automáticamente
- **Code Highlighting:** Bloques de código con sintaxis terminal
- **SEO por post:** Meta tags únicos para cada artículo
- **Responsive cards:** Diseño optimizado para móviles

#### 📝 Contenido
Artículos técnicos sobre:
- Azure CLI & Azure DevOps
- Kubernetes & Docker
- CI/CD Best Practices
- Infrastructure as Code
- Cloud Architecture
- Troubleshooting & Tips

#### 🔗 Rutas
- `/blog` - Lista de posts paginada
- `/blog/:slug` - Post individual con contenido completo

---

### 🎓 **Learning Journey** (`/learning-journey`)
Ruta de aprendizaje y certificaciones:

#### 📜 Certificaciones
- Microsoft Azure Certifications
- Kubernetes (CKA/CKAD)
- AWS Certifications
- GitLab CI/CD
- TypeScript Advanced

#### 🌱 Skills Timeline
- Progreso profesional
- Tecnologías dominadas
- Proyectos milestone
- Logros destacados

---

## 🏗️ Arquitectura del Proyecto

```
Durbano-portfolio/
├── angular-migration/          # Aplicación Angular 18+
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/         # Páginas principales
│   │   │   │   ├── home/      # Landing page
│   │   │   │   ├── blog/      # Lista de posts
│   │   │   │   └── blog-detail/  # Post individual
│   │   │   ├── ui/            # Componentes de UI
│   │   │   │   ├── hero/
│   │   │   │   ├── about/
│   │   │   │   ├── expertise/
│   │   │   │   ├── services/
│   │   │   │   ├── portfolio/
│   │   │   │   └── contact/
│   │   │   ├── core/          # Servicios & Guards
│   │   │   │   ├── services/
│   │   │   │   │   ├── blog.service.ts
│   │   │   │   │   └── seo.service.ts
│   │   │   │   └── models/
│   │   │   └── shared/        # Componentes compartidos
│   │   ├── public/            # Assets estáticos
│   │   │   ├── sitemap.xml
│   │   │   ├── robots.txt
│   │   │   └── img/
│   │   └── styles/            # SCSS global
│   ├── server.ts              # SSR Server
│   └── package.json
├── docs/                       # Documentación
│   ├── nginx-configuration.md
│   └── n8n-workflows/
└── .github/
    └── workflows/
        └── npm-publish-github-packages.yml  # CI/CD
```

---

## 🚀 Tecnologías & Stack

### Frontend
- **Framework:** Angular 18.2.0
- **Language:** TypeScript 5.5
- **Styling:** SCSS with mixins & variables
- **State:** Angular Signals (reactive)
- **Routing:** Angular Router with lazy loading
- **Forms:** Reactive Forms with validation
- **HTTP:** HttpClient with interceptors
- **SSR:** Angular Universal

### Backend & Automation
- **CMS:** n8n v1.115.3 (self-hosted)
- **Database:** n8n Data Tables
- **Webhooks:** n8n HTTP endpoints
- **AI Agent:** GPT-4o-mini with MCP validation

### DevOps & Infrastructure
- **CI/CD:** GitHub Actions
- **Containerization:** Docker + Docker Compose
- **Reverse Proxy:** Nginx Proxy Manager
- **SSL:** Let's Encrypt (automated renewal)
- **Server:** Ubuntu VPS
- **Monitoring:** Docker logs + health checks

### SEO & Performance
- **Meta Management:** Custom SeoService
- **Schema Markup:** JSON-LD
- **Sitemap:** XML sitemap with 8 URLs
- **Analytics:** Ready for Google Analytics
- **Search Console:** Integrated & verified

---

## 🛠️ Setup & Development

### Prerequisites
- Node.js 20+
- npm 10+
- Angular CLI 18+

### Installation

```bash
# Clone repository
git clone https://github.com/dannybombastic/Durbano-portfolio.git
cd Durbano-portfolio/angular-migration

# Install dependencies
npm install

# Development server
npm start
# Open http://localhost:4200
```

### Build

```bash
# Production build
npm run build

# SSR build
npm run build:ssr

# Output: dist/daniel-urbano-portfolio/browser/
```

### Deployment

Automated deployment via GitHub Actions on push to `main`:

1. Build Angular app (SSR)
2. Deploy to VPS via SSH
3. Update Docker container
4. Nginx serves the app

---

## 🎯 Roadmap

### ✅ Completed
- [x] Angular 18 migration
- [x] Blog system with n8n
- [x] SEO optimization
- [x] Mobile responsive design
- [x] CI/CD pipeline
- [x] SSL certificate
- [x] Sitemap & robots.txt
- [x] Open Graph & Twitter Cards

### 🚧 In Progress
- [ ] Learning Journey page
- [ ] Blog search functionality
- [ ] Dark/Light mode toggle
- [ ] Contact form backend
- [ ] Google Analytics integration

### 📋 Planned
- [ ] Newsletter subscription
- [ ] Comments system
- [ ] Related posts
- [ ] Blog categories page
- [ ] RSS feed
- [ ] PWA features
- [ ] i18n (ES/EN)

---

## 📊 Performance

### Lighthouse Scores
- **Performance:** 92/100
- **Accessibility:** 95/100
- **Best Practices:** 100/100
- **SEO:** 100/100

### Key Metrics
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

---

## 📝 License

MIT License - feel free to use this project as inspiration for your own portfolio!

---

## 👨‍💻 Author

**Daniel Urbano** - Azure DevOps Engineer

- 🌐 Website: [durbanod.com](https://durbanod.com)
- 💼 LinkedIn: [daniel-u-665a004b](https://linkedin.com/in/daniel-u-665a004b)
- 🐙 GitHub: [@dannybombastic](https://github.com/dannybombastic)
- 🦊 GitLab: [@dannybombastic](https://gitlab.com/dannybombastic)

---

## 🙏 Credits

- **Design & Development:** Colaboración entre RuXx y Daniel Urbano
- **Icons:** BoxIcons
- **Fonts:** Google Fonts (Inter)
- **Hosting:** Self-hosted VPS

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and ☕ by Daniel Urbano

</div>
