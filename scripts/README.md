# 🛠️ Scripts del Proyecto

Esta carpeta contiene los scripts de utilidad para el proyecto Durbano Portfolio.

## 📁 Estructura

```
scripts/
├── README.md              # Este archivo
├── CREATE_PROJECT.sh      # Script de creación del proyecto Angular
├── create-configs.sh      # Script para crear archivos de configuración
└── extract-code.sh        # Script para extraer código de archivos
```

---

## 📜 Descripción de Scripts

### **CREATE_PROJECT.sh**
Script principal para la creación inicial del proyecto Angular.

**Uso:**
```bash
cd scripts
./CREATE_PROJECT.sh
```

**Funcionalidades:**
- Crea la estructura del proyecto Angular
- Instala dependencias necesarias
- Configura archivos iniciales

---

### **create-configs.sh**
Genera archivos de configuración del proyecto.

**Uso:**
```bash
cd scripts
./create-configs.sh
```

**Genera:**
- Archivos de configuración de TypeScript
- Archivos de configuración de Angular
- Archivos de variables de entorno

---

### **extract-code.sh**
Extrae código de archivos HTML/CSS originales para migración.

**Uso:**
```bash
cd scripts
./extract-code.sh [archivo-origen] [archivo-destino]
```

**Funcionalidades:**
- Extrae código HTML
- Extrae código CSS
- Formatea para Angular

---

## 🚀 Ejecución de Scripts

### Dar Permisos de Ejecución
```bash
chmod +x scripts/*.sh
```

### Ejecutar un Script
```bash
# Desde la raíz del proyecto
./scripts/nombre-del-script.sh

# Desde la carpeta scripts
cd scripts
./nombre-del-script.sh
```

---

## ⚙️ Requisitos

### Para todos los scripts:
- **Bash:** 4.0 o superior
- **Permisos:** Permisos de ejecución en los archivos

### Para CREATE_PROJECT.sh:
- **Node.js:** 20.x o superior
- **npm:** 10.x o superior
- **Angular CLI:** 20.x

### Para create-configs.sh:
- **Bash:** 4.0 o superior

### Para extract-code.sh:
- **Bash:** 4.0 o superior
- **sed/awk:** Para procesamiento de texto

---

## 📝 Notas

### Ubicación Original
Estos scripts estaban originalmente en la carpeta `angular-migration/` y fueron movidos aquí para mejor organización.

### Scripts Seguros
Todos los scripts han sido verificados para:
- ✅ No contener comandos destructivos sin confirmación
- ✅ Tener validaciones de entrada
- ✅ Proporcionar mensajes de error claros

### Backup
Se recomienda hacer backup antes de ejecutar scripts que modifiquen archivos:
```bash
# Crear backup
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz angular-migration/

# O usar git
git add . && git commit -m "Backup antes de ejecutar script"
```

---

## 🔧 Mantenimiento

### Añadir un Nuevo Script
1. Crear el archivo `.sh` en esta carpeta
2. Añadir shebang: `#!/bin/bash`
3. Dar permisos: `chmod +x nombre-script.sh`
4. Documentarlo en este README

### Template de Script
```bash
#!/bin/bash

# Nombre: nombre-script.sh
# Descripción: Descripción breve
# Uso: ./nombre-script.sh [args]

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función de ayuda
function show_help() {
    echo "Uso: $0 [opciones]"
    echo ""
    echo "Opciones:"
    echo "  -h, --help     Muestra esta ayuda"
    exit 0
}

# Validaciones
if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    show_help
fi

# Lógica del script
echo -e "${GREEN}Iniciando script...${NC}"

# Tu código aquí

echo -e "${GREEN}Script completado!${NC}"
```

---

## 🐛 Troubleshooting

### Permiso denegado
```bash
chmod +x scripts/nombre-script.sh
```

### Script no encontrado
```bash
# Verificar que estás en la ubicación correcta
pwd
ls -la scripts/

# Usar ruta absoluta
/home/dannybombastic/Documents/Durbano-portfolio/scripts/nombre-script.sh
```

### Errores de sintaxis
```bash
# Verificar sintaxis
bash -n scripts/nombre-script.sh

# Ejecutar en modo debug
bash -x scripts/nombre-script.sh
```

---

## 📚 Convenciones

### Nomenclatura
- Usar snake_case o kebab-case
- Nombres descriptivos
- Extensión `.sh`

### Código
- Shebang en primera línea: `#!/bin/bash`
- Comentarios descriptivos
- Validación de inputs
- Mensajes de error claros
- Exit codes apropiados

### Documentación
- Header con descripción
- Parámetros documentados
- Ejemplos de uso
- Errores comunes

---

## 🔗 Referencias

### Bash Scripting
- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [ShellCheck](https://www.shellcheck.net/) - Linter para bash

### Buenas Prácticas
- Usar `set -e` para exit on error
- Usar `set -u` para error on undefined variables
- Quotes alrededor de variables: `"$VAR"`
- Funciones para código repetitivo

---

**Última actualización:** 18 de Octubre, 2025  
**Mantenido por:** dannybombastic
