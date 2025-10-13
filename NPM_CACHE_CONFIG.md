# 🚀 Configuración de Cache en Nginx Proxy Manager (NPM)

## Configuración para durbanod.com

Si usas **Nginx Proxy Manager**, aquí está cómo configurar el cache correctamente desde la interfaz web.

---

## 📋 Pasos en NPM

### 1. Accede a tu Proxy Host

1. Ve a **Proxy Hosts** en NPM
2. Edita el proxy de `durbanod.com`
3. Ve a la pestaña **"Advanced"**

### 2. Añade esta Configuración en "Custom Nginx Configuration"

```nginx
# ========================================
# CACHE CONFIGURATION
# ========================================

# Enable Gzip Compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/json
    application/javascript
    application/x-javascript
    application/xml
    application/xml+rss
    image/svg+xml;

# Browser Caching - Images
location ~* \.(jpg|jpeg|png|gif|ico|webp|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Browser Caching - CSS & JavaScript
location ~* \.(css|js)$ {
    expires 1M;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Browser Caching - Fonts
location ~* \.(woff|woff2|ttf|otf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# HTML - Short cache
location ~* \.(html|htm)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}

# Service Worker - No cache
location = /service-worker.js {
    expires off;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}

# Manifest
location = /manifest.json {
    expires 1d;
    add_header Cache-Control "public";
}

# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### 3. Habilita "Block Common Exploits"

En la misma configuración del proxy:
- ✅ Marca **"Block Common Exploits"**
- ✅ Marca **"Websockets Support"** (si usas features en tiempo real)

### 4. SSL Configuration

En la pestaña **SSL**:
- ✅ Habilita **"Force SSL"**
- ✅ Habilita **"HTTP/2 Support"**
- ✅ Habilita **"HSTS Enabled"** con duración de 31536000 segundos
- ✅ Habilita **"HSTS Subdomains"**

---

## 🎯 Configuración Visual en NPM

### Pestaña "Details"
```
Domain Names: durbanod.com, www.durbanod.com
Scheme: http
Forward Hostname/IP: [tu servidor]
Forward Port: [tu puerto]
☑ Block Common Exploits
☑ Websockets Support
```

### Pestaña "SSL"
```
SSL Certificate: [Selecciona tu certificado Let's Encrypt]
☑ Force SSL
☑ HTTP/2 Support
☑ HSTS Enabled
☑ HSTS Subdomains
```

### Pestaña "Advanced"
```
Pega la configuración de cache de arriba
```

---

## ✅ Verificación

Después de guardar los cambios:

1. **Limpia el cache del navegador**
   - Chrome: Ctrl+Shift+Del
   - Firefox: Ctrl+Shift+Del

2. **Verifica los headers** con:
   ```bash
   curl -I https://durbanod.com/aml.css
   ```
   
   Deberías ver:
   ```
   Cache-Control: public, immutable
   X-Content-Type-Options: nosniff
   X-Frame-Options: SAMEORIGIN
   Content-Encoding: gzip
   ```

3. **Ejecuta PageSpeed Insights**
   ```
   https://pagespeed.web.dev/analysis/https-durbanod-com/
   ```

---

## 📊 Mejoras Esperadas

Con esta configuración en NPM:

| Métrica | Mejora |
|---------|---------|
| **Cache Lifetime** | ✅ 125 KiB ahorrados |
| **GZIP Compression** | ✅ ~40% reducción en tamaño |
| **Security Headers** | ✅ Todos configurados |
| **SSL/HTTP2** | ✅ Optimizado |

---

## 🔧 Troubleshooting

### Si no funciona el cache:

1. **Verifica que NPM aplicó los cambios**
   - Reinicia el proxy host en NPM
   - Usa "Force Reload" en NPM

2. **Revisa los logs**
   ```bash
   docker logs nginx-proxy-manager
   ```

3. **Prueba la configuración**
   ```bash
   # Test desde servidor
   nginx -t
   
   # Ver configuración activa
   docker exec nginx-proxy-manager cat /etc/nginx/conf.d/npm-*.conf
   ```

### Si Google Analytics sigue fallando:

El error `ERR_CONNECTION_REFUSED` puede ser por:
- Bloqueador de ads (uBlock, AdBlock)
- Firewall/VPN bloqueando Google
- DNS bloqueando tracking

**Solución**: El código actualizado en `index.html` ya maneja esto gracefully sin errores en consola.

---

## 🎉 Resultado Final

Con NPM configurado correctamente + las optimizaciones del código:

**Score esperado**: 85-92 en PageSpeed Mobile

**Métricas objetivo**:
- FCP: < 2.5s ✅
- LCP: < 3.5s ✅
- TBT: < 100ms ✅
- CLS: < 0.1 ✅

---

## 📝 Notas Importantes

1. **No necesitas archivos .htaccess** - NPM/Nginx no los usa
2. **La configuración se guarda en NPM** - No necesitas acceso SSH
3. **Los cambios son inmediatos** después de guardar
4. **El cache del navegador** puede tardar en actualizarse (usa modo incógnito para probar)

---

**¿Necesitas ayuda?** La configuración de NPM es muy visual y fácil de seguir. ¡Solo copia la configuración en la sección "Advanced"!
