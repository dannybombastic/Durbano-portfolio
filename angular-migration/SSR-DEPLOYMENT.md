# 🚀 Despliegue SSR (Server-Side Rendering) - Guía Completa

## 📋 **¿Qué es SSR y por qué es importante para SEO?**

### **Sin SSR (Client-Side Rendering - CSR)**:
```html
<!-- Lo que ven los bots de búsqueda -->
<html>
  <body>
    <app-root></app-root>  <!-- ❌ Vacío! -->
    <script src="main.js"></script>
  </body>
</html>
```
- ❌ Los bots ven HTML vacío
- ❌ Mala indexación en Google
- ❌ Sin preview en redes sociales
- ❌ Tiempo de carga inicial más lento

### **Con SSR (Server-Side Rendering)**:
```html
<!-- Lo que ven los bots de búsqueda -->
<html>
  <body>
    <app-root>
      <h1>Daniel Urbano - DevOps Engineer</h1>  <!-- ✅ Contenido real! -->
      <p>Welcome to my portfolio...</p>
      <!-- Todo el contenido pre-renderizado -->
    </app-root>
    <script src="main.js"></script>
  </body>
</html>
```
- ✅ Los bots ven contenido completo
- ✅ Excelente SEO
- ✅ Previews en redes sociales
- ✅ First Contentful Paint más rápido

---

## 🏗️ **Arquitectura del Despliegue SSR**

```
┌─────────────────────────────────────────────────┐
│  GitHub Actions (CI/CD)                         │
│  - npm run build:ssr                            │
│  - Crea dist/browser + dist/server              │
│  - Empaqueta todo en tarball                    │
└───────────────────┬─────────────────────────────┘
                    │
                    ├─ dist/browser/     (archivos estáticos)
                    ├─ dist/server/      (Node.js server)
                    ├─ package.json      (dependencias)
                    └─ Dockerfile        (imagen Docker)
                    
                    ▼
┌─────────────────────────────────────────────────┐
│  Servidor de Producción                        │
│  ┌───────────────────────────────────────────┐ │
│  │  Docker Container                         │ │
│  │  ┌─────────────────────────────────────┐ │ │
│  │  │  Node.js Express Server             │ │ │
│  │  │  Puerto 4000                        │ │ │
│  │  │                                     │ │ │
│  │  │  ┌──────────────┐                  │ │ │
│  │  │  │ Request →    │                  │ │ │
│  │  │  │ Angular SSR  │ → Renderiza HTML │ │ │
│  │  │  │ ← HTML       │                  │ │ │
│  │  │  └──────────────┘                  │ │ │
│  │  └─────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 🔧 **Comandos Disponibles**

### **Desarrollo Local**:
```bash
# Desarrollo normal (sin SSR)
npm start

# Desarrollo con SSR
npm run serve:ssr:dev
```

### **Construcción**:
```bash
# Build SSR completo (browser + server)
npm run build:ssr

# Solo browser (para hosting estático como GitHub Pages)
npm run build
```

### **Servidor SSR Local**:
```bash
# Iniciar servidor SSR (después de build:ssr)
npm run serve:ssr

# URL: http://localhost:4000
```

### **Docker (Recomendado para producción)**:
```bash
# Construir imagen Docker
npm run docker:build

# Ejecutar contenedor
npm run docker:run

# Docker Compose (con hot reload)
npm run docker:compose

# Ver logs
npm run docker:logs
```

### **Verificación**:
```bash
# Verificar que SSR esté funcionando
npm run verify:ssr

# Verificar en producción
npm run verify:ssr http://tu-dominio.com
```

---

## 📦 **Estructura de Despliegue**

### **Archivos necesarios en producción**:
```
/home/dannybombastic/durbanod/portfolio-ssr/
├── dist/
│   └── daniel-urbano-portfolio/
│       ├── browser/              # Archivos estáticos
│       │   ├── index.html
│       │   ├── main-*.js
│       │   └── ...
│       └── server/               # Servidor Node.js
│           └── server.mjs        # ⭐ Punto de entrada SSR
├── node_modules/                 # Dependencias
├── package.json
├── package-lock.json
├── Dockerfile                    # Configuración Docker
└── docker-compose.yml            # Orquestación
```

---

## 🚀 **Proceso de Despliegue Automático**

### **1. Push a GitHub**:
```bash
git add .
git commit -m "feat: SSR deployment"
git push origin main
```

### **2. GitHub Actions ejecuta**:
```yaml
1. Checkout código
2. Instalar dependencias
3. npm run build:ssr → Genera browser/ y server/
4. Empaquetar todo en tarball
5. Copiar a servidor vía SSH
6. Extraer archivos
7. docker compose up -d --build
8. Verificar salud del contenedor
```

### **3. Docker construye imagen**:
```dockerfile
FROM node:20-alpine
COPY dist/ ./dist/
COPY node_modules/ ./node_modules/
CMD ["node", "dist/daniel-urbano-portfolio/server/server.mjs"]
```

### **4. Servidor SSR escucha en puerto 4000**:
```
http://tu-dominio.com → Nginx/Traefik → Docker Container (4000) → Node.js SSR
```

---

## 🧪 **Cómo Verificar que SSR está Funcionando**

### **Método 1: curl (como bot de Google)**:
```bash
curl -A "Googlebot" http://localhost:4000 | grep "<h1"
```

**Resultado esperado**:
```html
<h1>Daniel Urbano - DevOps Engineer</h1>  <!-- ✅ Contenido pre-renderizado -->
```

**Resultado INCORRECTO (sin SSR)**:
```html
<app-root></app-root>  <!-- ❌ Vacío -->
```

### **Método 2: Script de verificación**:
```bash
npm run verify:ssr
```

**Salida esperada**:
```
✅ SSR está funcionando correctamente!
📄 La página contiene HTML pre-renderizado
   Los bots de búsqueda pueden indexar el contenido.
```

### **Método 3: DevTools (View Page Source)**:
1. Abre tu sitio en el navegador
2. Click derecho → "Ver código fuente" (NO "Inspeccionar")
3. Busca contenido dentro de `<app-root>`

**Con SSR**: Verás HTML completo
**Sin SSR**: Solo verás `<app-root></app-root>`

---

## 🔍 **Diferencias entre CSR y SSR**

| Aspecto | CSR (Solo Browser) | SSR (Browser + Server) |
|---------|-------------------|------------------------|
| **SEO** | ❌ Malo | ✅ Excelente |
| **First Paint** | ❌ Lento | ✅ Rápido |
| **Hosting** | ✅ Simple (GitHub Pages) | ⚙️ Requiere Node.js |
| **Costo** | ✅ Gratis | 💰 Requiere servidor |
| **Social Preview** | ❌ No funciona | ✅ Funciona |
| **JavaScript disabled** | ❌ No funciona | ✅ Funciona parcialmente |

---

## 🐛 **Troubleshooting**

### **Problema: "npm run serve:ssr" da error**
```bash
# Solución: Primero construye
npm run build:ssr
npm run serve:ssr
```

### **Problema: Docker no inicia**
```bash
# Ver logs
docker compose logs -f

# Reconstruir desde cero
docker compose down
docker compose up -d --build
```

### **Problema: SSR no funciona en producción**
```bash
# Verificar que el puerto 4000 esté abierto
curl http://tu-dominio.com:4000

# Verificar logs del contenedor
docker compose logs --tail=50
```

### **Problema: "Module not found" en server.mjs**
```bash
# Verificar que node_modules esté en el servidor
ls -la /home/dannybombastic/durbanod/portfolio-ssr/node_modules

# Si falta, el Dockerfile debería copiarlo
```

---

## 📚 **Referencias**

- [Angular SSR Documentation](https://angular.dev/guide/ssr)
- [Express.js Server](https://expressjs.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [SEO with Angular](https://angular.dev/guide/seo)

---

## ✅ **Checklist de Despliegue SSR**

- [ ] `npm run build:ssr` funciona sin errores
- [ ] `npm run serve:ssr` inicia el servidor en puerto 4000
- [ ] `npm run verify:ssr` muestra ✅ SSR funcionando
- [ ] Dockerfile existe y está configurado
- [ ] docker-compose.yml existe y apunta al puerto correcto
- [ ] GitHub Actions despliega con `build:ssr` (no solo `build`)
- [ ] Servidor copia `dist/` completo (browser/ + server/)
- [ ] Nginx/Proxy reverso apunta al puerto 4000
- [ ] Verificar en producción con curl o DevTools

---

🎯 **¡Listo!** Ahora tu portfolio tiene SSR funcionando y Google puede indexarlo correctamente.
