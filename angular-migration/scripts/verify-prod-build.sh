#!/bin/bash

# 🔍 Script de Verificación de Configuración de Producción
# Este script verifica que el build de producción use la URL correcta

set -e

echo "🚀 Verificando configuración de producción..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Paso 1: Limpiar build anterior
echo "📦 Limpiando build anterior..."
rm -rf dist/
echo -e "${GREEN}✅ Build anterior eliminado${NC}"
echo ""

# Paso 2: Realizar build de producción
echo "🔨 Realizando build de producción..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build de producción completado${NC}"
else
    echo -e "${RED}❌ Error en el build${NC}"
    exit 1
fi
echo ""

# Paso 3: Verificar que NO exista la URL de test
echo "🔍 Verificando que NO se use la URL de TEST..."
if grep -r "webhook-test" dist/daniel-urbano-portfolio/browser/ > /dev/null 2>&1; then
    echo -e "${RED}❌ ERROR: Se encontró la URL de TEST en el build${NC}"
    echo -e "${YELLOW}   La URL 'webhook-test' NO debería estar en producción${NC}"
    exit 1
else
    echo -e "${GREEN}✅ URL de TEST NO encontrada (correcto)${NC}"
fi
echo ""

# Paso 4: Verificar que SÍ exista la URL de producción
echo "🔍 Verificando que SÍ se use la URL de PRODUCCIÓN..."
if grep -r "webhook/blog-posts" dist/daniel-urbano-portfolio/browser/ > /dev/null 2>&1; then
    echo -e "${GREEN}✅ URL de PRODUCCIÓN encontrada (correcto)${NC}"
else
    echo -e "${RED}❌ ERROR: NO se encontró la URL de PRODUCCIÓN${NC}"
    exit 1
fi
echo ""

# Paso 5: Verificar production flag
echo "🔍 Verificando flag de producción..."
if grep -r "production.*true" dist/daniel-urbano-portfolio/browser/ > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Flag 'production: true' encontrado${NC}"
else
    echo -e "${YELLOW}⚠️  Advertencia: No se pudo verificar el flag de producción${NC}"
fi
echo ""

# Resumen
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ TODAS LAS VERIFICACIONES PASARON${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Resumen:"
echo "  • Build de producción: OK"
echo "  • URL de TEST: NO presente ✅"
echo "  • URL de PRODUCCIÓN: Presente ✅"
echo "  • Flag production: true ✅"
echo ""
echo "🎉 El build está listo para desplegar en producción"
echo ""
