# Imágenes del Portfolio

Esta carpeta contiene las imágenes estáticas que se sirven desde `/img/` en producción.

## 📸 Imágenes Requeridas

### ⚠️ CRÍTICO para SEO
- **Daniel_Urbano.webp** - Imagen principal de perfil
  - Usado en: Open Graph, Twitter Cards, SEO
  - Dimensiones recomendadas: 1200x630px (ratio 1.91:1)
  - Formato: WebP optimizado
  - Peso máximo: 500KB

## 🚀 Cómo agregar la imagen

### Opción 1: Copiar desde proyecto viejo
```bash
# Si tienes la imagen en otro lugar
cp /ruta/a/tu/Daniel_Urbano.webp ./angular-migration/public/img/
```

### Opción 2: Convertir desde otra imagen
```bash
# Convertir JPG/PNG a WebP
cwebp -q 85 tu-foto.jpg -o Daniel_Urbano.webp

# O con ImageMagick
convert tu-foto.jpg -quality 85 Daniel_Urbano.webp
```

### Opción 3: Placeholder temporal
Por ahora puedes usar cualquier imagen profesional tuya y renombrarla a `Daniel_Urbano.webp`

## 📝 Notas
- Angular sirve `/public/` como raíz estática
- URL accesible: `https://danielurbano.com/img/Daniel_Urbano.webp`
- Importante para compartir en redes sociales (Open Graph)
