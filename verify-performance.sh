#!/bin/bash

# Performance Verification Script v2
# Verifica todas las optimizaciones y fixes

echo "🚀 Verificando Optimizaciones de Performance..."
echo "================================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de checks
PASSED=0
FAILED=0

# Función para check
check() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $2"
        ((FAILED++))
    fi
}

echo "📝 Verificando Optimizaciones de Scripts..."
# 1. Verificar defer en scripts
grep -q 'defer src="main.js"' index.html
check $? "Scripts tienen atributo defer"

grep -q 'fetchpriority="high"' index.html
check $? "Script principal tiene fetchpriority='high'"

echo ""
echo "🎨 Verificando CSS y Estilos..."
# 2. Verificar CSS crítico inline
grep -q '<style>' index.html
check $? "CSS crítico inline presente"

# 3. Verificar preload CSS
grep -q 'rel="preload"' index.html
check $? "Preload para recursos críticos"

echo ""
echo "🌐 Verificando Conexiones Externas..."
# 4. Verificar DNS prefetch
grep -q 'rel="dns-prefetch"' index.html
check $? "DNS prefetch configurado"

# 5. Verificar preconnect
grep -q 'rel="preconnect"' index.html
check $? "Preconnect configurado"

echo ""
echo "⚙️ Verificando Service Worker y PWA..."
# 6. Verificar Service Worker
grep -q 'serviceWorker' main.js
check $? "Service Worker registrado en main.js"

[ -f "service-worker.js" ]
check $? "Archivo service-worker.js existe"

# 7. Verificar PWA Manifest
[ -f "manifest.json" ]
check $? "Archivo manifest.json existe"

grep -q 'rel="manifest"' index.html
check $? "Manifest enlazado en HTML"

echo ""
echo "🔧 Verificando JavaScript..."
# 8. Verificar optimizaciones en JavaScript
grep -q 'throttle' main.js
check $? "Función throttle implementada"

grep -q 'requestIdleCallback' main.js
check $? "requestIdleCallback implementado"

grep -q 'passive: true' main.js
check $? "Passive event listeners configurados"

echo ""
echo "🎯 Verificando Fixes de Errores..."
# 9. Verificar favicon
[ -f "favicon.svg" ]
check $? "Favicon SVG existe"

grep -q 'rel="icon"' index.html
check $? "Favicon enlazado en HTML"

# 10. Verificar manifest sin errores
grep -q 'favicon.svg' manifest.json
check $? "Manifest usa favicon correcto"

! grep -q 'Daniel_Urbano.webp' manifest.json
check $? "Manifest no referencia imágenes 404"

# 11. Verificar Google Analytics error handling
grep -q 'navigator.onLine' index.html
check $? "Analytics con error handling"

echo ""
echo "🔐 Verificando Meta Tags..."
# 12. Verificar meta tags
grep -q 'name="theme-color"' index.html
check $? "Theme color meta tag presente"

echo ""
echo "📚 Verificando Documentación..."
# 13. Verificar archivos de documentación
[ -f "NPM_CACHE_CONFIG.md" ]
check $? "Guía de NPM configuración existe"

[ -f "PERFORMANCE_OPTIMIZATIONS.md" ]
check $? "Documentación de optimizaciones existe"

[ -f "FIXES_SUMMARY.md" ]
check $? "Resumen de fixes existe"

echo ""
echo "================================================"
echo -e "Resumen: ${GREEN}${PASSED} checks pasados${NC}, ${RED}${FAILED} fallidos${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡Todas las optimizaciones están implementadas!${NC}"
    echo ""
    echo "✅ Errores de consola corregidos:"
    echo "   - GTM.js con error handling"
    echo "   - Favicon añadido"
    echo "   - Manifest sin imágenes 404"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Sube los cambios al servidor"
    echo "2. Configura cache en Nginx Proxy Manager (ver NPM_CACHE_CONFIG.md)"
    echo "3. Limpia el cache del navegador"
    echo "4. Ejecuta PageSpeed Insights: https://pagespeed.web.dev/"
    echo ""
    exit 0
else
    echo -e "${YELLOW}⚠️  Algunas optimizaciones faltan o tienen errores${NC}"
    echo "Revisa los checks fallidos arriba"
    exit 1
fi
