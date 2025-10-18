#!/bin/bash

# 🚀 Script de Creación Automática del Proyecto Angular
# Este script crea TODA la estructura del proyecto basándose en los documentos CODE_PART_*.md

set -e  # Exit on error

echo "🎯 Iniciando creación del proyecto Daniel Urbano Portfolio..."
echo ""

PROJECT_ROOT="$(pwd)/angular-migration"

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para crear archivos desde los documentos
create_file_with_content() {
    local filepath="$1"
    local content="$2"
    
    # Crear directorio si no existe
    mkdir -p "$(dirname "$filepath")"
    
    # Crear archivo
    echo "$content" > "$filepath"
    echo -e "${GREEN}✓${NC} Creado: $filepath"
}

echo -e "${BLUE}📁 Paso 1: Creando estructura de directorios...${NC}"

# Crear directorios base
mkdir -p "$PROJECT_ROOT"/{src,public}
mkdir -p "$PROJECT_ROOT/src"/{app,styles}
mkdir -p "$PROJECT_ROOT/src/app"/{core,shared,ui,pages}
mkdir -p "$PROJECT_ROOT/src/app/core"/{models,services,constants}
mkdir -p "$PROJECT_ROOT/src/app/shared/components"/{social-links,button,icon}
mkdir -p "$PROJECT_ROOT/src/app/ui"/{header,hero,about,expertise,services,portfolio,contact,footer}
mkdir -p "$PROJECT_ROOT/src/app/ui/header/nav"/{nav-list/nav-item}
mkdir -p "$PROJECT_ROOT/src/app/ui/hero"/{hero-content,hero-visual,scroll-indicator}
mkdir -p "$PROJECT_ROOT/src/app/ui/about"/{skills-visualization,stats-grid/stat-item}
mkdir -p "$PROJECT_ROOT/src/app/ui/expertise/expertise-grid/expertise-card"
mkdir -p "$PROJECT_ROOT/src/app/ui/services/service-grid/service-card"
mkdir -p "$PROJECT_ROOT/src/app/ui/portfolio/portfolio-grid/portfolio-project"
mkdir -p "$PROJECT_ROOT/src/app/ui/contact"/{contact-info/contact-card,contact-visual}
mkdir -p "$PROJECT_ROOT/src/app/pages/home"

echo -e "${GREEN}✓${NC} Estructura de directorios creada"
echo ""

echo -e "${BLUE}📝 Paso 2: Copiando archivos de configuración ya existentes...${NC}"

# Los archivos ya creados (tsconfig.json, .eslintrc.json, etc.) ya están en su lugar

echo -e "${GREEN}✓${NC} Archivos de configuración en su lugar"
echo ""

echo -e "${YELLOW}⚠️  NOTA IMPORTANTE:${NC}"
echo ""
echo "Este script crea la ESTRUCTURA de directorios."
echo "Para crear TODOS los archivos con su código completo, debes:"
echo ""
echo "1. Leer cada archivo CODE_PART_*.md"
echo "2. Copiar el código de cada componente/servicio/modelo"
echo "3. Crear los archivos correspondientes manualmente"
echo ""
echo "O bien, puedes usar este comando para extraer automáticamente:"
echo ""
echo "  cd angular-migration"
echo "  # Ejecutar script de extracción (ver abajo)"
echo ""

# Crear script de extracción
cat > "$PROJECT_ROOT/extract-code.sh" << 'EXTRACT_SCRIPT'
#!/bin/bash

# Script para extraer código de los documentos CODE_PART_*.md
# y crear los archivos correspondientes

echo "🔍 Extrayendo código de documentos..."

# TODO: Este script debe ser implementado para parsear los archivos .md
# y extraer los bloques de código con sus rutas correspondientes

echo "⚠️  Este script requiere implementación adicional"
echo "Por favor, crea los archivos manualmente siguiendo los documentos CODE_PART_*.md"

EXTRACT_SCRIPT

chmod +x "$PROJECT_ROOT/extract-code.sh"

echo ""
echo -e "${GREEN}✅ ESTRUCTURA CREADA EXITOSAMENTE${NC}"
echo ""
echo "📍 Ubicación: $PROJECT_ROOT"
echo ""
echo "🎯 Próximos pasos:"
echo ""
echo "1. Revisar los documentos CODE_PART_1_CORE.md hasta CODE_PART_7_FINAL_CONFIG.md"
echo "2. Crear cada archivo copiando el código de los documentos"
echo "3. Copiar assets (fonts/, img/) a public/"
echo "4. Ejecutar: npm install"
echo "5. Ejecutar: npm start"
echo ""
echo "📚 Documentos de referencia en orden:"
echo "   - CODE_PART_1_CORE.md           (Services, Data, SCSS Variables)"
echo "   - CODE_PART_2_SHARED_COMPONENTS.md (Social Links, Button, Icon)"
echo "   - CODE_PART_3_HEADER_NAV.md     (Header, Nav, Nav-List, Nav-Item)"
echo "   - CODE_PART_4_ALL_SECTIONS_1.md (Hero, About)"
echo "   - CODE_PART_5_ALL_SECTIONS_2.md (Expertise, Services, Portfolio, Contact)"
echo "   - CODE_PART_6_FOOTER_HOME_APP.md (Footer, Home Page, App Root)"
echo "   - CODE_PART_7_FINAL_CONFIG.md   (package.json, angular.json, configs)"
echo ""
echo "🚀 ¡Proyecto listo para ser implementado!"
