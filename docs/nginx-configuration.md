# Configuración de Nginx para durbanod.com

Esta configuración asegura que tanto el routing de Angular como los archivos estáticos (sitemap.xml, robots.txt) funcionen correctamente.

## 🚨 Problema

Cuando visitas `https://durbanod.com/sitemap.xml` o recargas rutas como `/blog`, obtienes un 404 porque:
1. Nginx intenta servir estos archivos/rutas directamente
2. No encuentra el archivo y devuelve 404
3. Nunca llega a Angular para manejar el routing (en caso de `/blog`)
4. En el caso del sitemap, el archivo existe pero no se sirve correctamente

## ✅ Solución

Necesitas configurar Nginx para que:
1. **Sirva archivos estáticos** (sitemap.xml, robots.txt, favicon, etc.) directamente
2. **Redirija todo lo demás** a index.html para que Angular maneje el routing

## 📝 Configuración para Nginx Proxy Manager

### Paso 1: Ir a tu Proxy Host

1. Abre **Nginx Proxy Manager**
2. Ve a **Proxy Hosts**
3. Edita el host de `durbanod.com`

### Paso 2: Agregar Custom Nginx Configuration

En la pestaña **Advanced**, agrega esto en **Custom Nginx Configuration**:

```nginx
# Servir archivos estáticos directamente
location ~ ^/(sitemap\.xml|robots\.txt|favicon\.svg|favicon\.ico|manifest\.json)$ {
    try_files $uri =404;
    expires 1d;
    add_header Cache-Control "public, immutable";
}

# Servir carpeta de imágenes
location /img/ {
    try_files $uri =404;
    expires 30d;
    add_header Cache-Control "public, immutable";
}

# Servir assets estáticos de Angular (CSS, JS, fonts)
location ~ ^/(assets|styles|main|polyfills|runtime|vendor).*\.(js|css|woff|woff2|ttf|svg|png|jpg|jpeg|webp|gif|ico)$ {
    try_files $uri =404;
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Todas las demás rutas → Angular Router
location / {
    try_files $uri $uri/ /index.html;
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
}

# Headers de seguridad (opcional pero recomendado)
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### Paso 3: Guardar y Aplicar

1. Click en **Save**
2. Espera unos segundos
3. Prueba:
   - ✅ `https://durbanod.com/sitemap.xml` → Debe mostrar el XML
   - ✅ `https://durbanod.com/robots.txt` → Debe mostrar el texto plano
   - ✅ `https://durbanod.com/blog` → Debe cargar Angular
   - ✅ Recarga en `/blog` → No debe dar 404

## 🔍 Verificación

### Test 1: Sitemap
```bash
curl -I https://durbanod.com/sitemap.xml
# Debe devolver: 200 OK
# Content-Type: application/xml

curl https://durbanod.com/sitemap.xml | head -5
# Debe mostrar el contenido XML
```

### Test 2: Robots.txt
```bash
curl https://durbanod.com/robots.txt
# Debe mostrar:
# User-agent: *
# Allow: /
# Sitemap: https://durbanod.com/sitemap.xml
```

### Test 3: Blog routing
```bash
curl -I https://durbanod.com/blog
# Debe devolver: 200 OK
# Content-Type: text/html (index.html de Angular)
```

## 📊 Explicación de la Configuración

| Directiva | Propósito |
|-----------|-----------|
| `location ~ ^/(sitemap\.xml\|...)$` | Match exacto para archivos estáticos en raíz |
| `try_files $uri =404` | Sirve el archivo si existe, sino 404 |
| `location /img/` | Sirve todas las imágenes de `/public/img/` |
| `location ~ ^/(assets\|...)` | Sirve bundles de Angular con cache largo |
| `location /` | Catch-all: todo lo demás va a index.html |
| `try_files $uri $uri/ /index.html` | SPA routing: intenta archivo → directorio → index.html |

## 🔧 Alternativa: Configuración Nginx Standalone

Si usas Nginx directamente (no Nginx Proxy Manager):

```nginx
server {
    listen 80;
    server_name durbanod.com www.durbanod.com;
    
    root /var/www/durbanod.com;
    index index.html;

    # Archivos estáticos en raíz
    location ~ ^/(sitemap\.xml|robots\.txt|favicon\.svg|favicon\.ico|manifest\.json)$ {
        try_files $uri =404;
        expires 1d;
        add_header Cache-Control "public, immutable";
    }

    # Imágenes
    location /img/ {
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Assets de Angular
    location ~ \.(js|css|woff|woff2|ttf|svg|png|jpg|jpeg|webp|gif|ico)$ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## 📝 Notas Importantes

1. **Angular SSR**: Si usas Server-Side Rendering, esta configuración puede necesitar ajustes
2. **Cache**: Los archivos estáticos tienen cache largo (30d-1y), index.html sin cache
3. **Orden**: Nginx procesa las `location` en orden específico (exact match → regex → prefix)
4. **Test local**: Puedes probar con `ng serve` pero nginx es necesario en producción

## 🚀 Después de Aplicar

1. Limpia la cache del navegador (Ctrl+Shift+R)
2. Verifica en Google Search Console:
   - Ve a **Sitemaps**
   - Ingresa: `sitemap.xml`
   - Click **Submit**
3. Verifica que no haya errores 404 en Network tab del navegador

## 🐛 Troubleshooting

### Problema: Sitemap aún no se ve
```bash
# Verifica que el archivo existe en el servidor
ls -la /ruta/a/tu/app/public/sitemap.xml

# Verifica permisos
chmod 644 /ruta/a/tu/app/public/sitemap.xml
```

### Problema: Blog da 404 al recargar
- Asegúrate que la línea `try_files $uri $uri/ /index.html;` está en `location /`
- Reinicia Nginx: `sudo systemctl reload nginx`

### Problema: CSS/JS no cargan
- Verifica que los archivos estén en `/dist/browser/` después del build
- Asegúrate que `base href="/"` está en index.html
