#!/bin/bash

echo "🔍 Verificando SSR en producción..."
echo ""

# URL de tu sitio (ajusta según tu dominio)
URL="${1:-http://localhost:4000}"

echo "📡 Haciendo petición a: $URL"
echo ""

# Hacer curl y verificar si tiene contenido pre-renderizado
RESPONSE=$(curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "$URL")

# Verificar que la respuesta no esté vacía
if [ -z "$RESPONSE" ]; then
    echo "❌ ERROR: No se recibió respuesta del servidor"
    exit 1
fi

# Verificar si contiene contenido pre-renderizado (no solo <app-root></app-root>)
if echo "$RESPONSE" | grep -q "<app-root></app-root>"; then
    echo "❌ ERROR: SSR NO está funcionando - solo hay el app-root vacío"
    echo ""
    echo "📄 Esto significa que Angular está haciendo Client-Side Rendering (CSR)"
    echo "   Los bots de búsqueda verán una página vacía."
    exit 1
fi

# Verificar que tenga contenido HTML real
if echo "$RESPONSE" | grep -q "<h1\|<p\|<div.*>.*</div>"; then
    echo "✅ SSR está funcionando correctamente!"
    echo ""
    echo "📄 La página contiene HTML pre-renderizado"
    echo "   Los bots de búsqueda pueden indexar el contenido."
    
    # Mostrar primeros 500 caracteres del body
    echo ""
    echo "🔍 Vista previa del contenido renderizado:"
    echo "================================================"
    echo "$RESPONSE" | grep -o '<body[^>]*>.*</body>' | head -c 500
    echo ""
    echo "================================================"
    
    exit 0
else
    echo "⚠️  ADVERTENCIA: No se detectó contenido HTML significativo"
    echo ""
    echo "📄 Verifica manualmente el contenido de la respuesta"
    exit 1
fi
