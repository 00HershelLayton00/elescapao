#!/bin/bash
echo "🎬 Iniciando servidor multimedia..."

# Cargar .env si existe (solo para mostrar la ruta)
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Si no hay MULTIMEDIA_PATH definido, pedirlo
if [ -z "$MULTIMEDIA_PATH" ]; then
    echo "⚠️  No se ha definido MULTIMEDIA_PATH"
    read -p "📁 Ingresa la ruta completa a la carpeta multimedia: " MULTIMEDIA_PATH
    echo "MULTIMEDIA_PATH=$MULTIMEDIA_PATH" >> .env
fi

# Verificar que la carpeta existe
if [ ! -d "$MULTIMEDIA_PATH" ]; then
    echo "❌ ERROR: La carpeta $MULTIMEDIA_PATH no existe"
    echo "   Créala con: mkdir -p $MULTIMEDIA_PATH"
    exit 1
fi

echo "📁 Ruta multimedia: $MULTIMEDIA_PATH"
echo "🌐 Abre http://localhost:3000"
echo ""

# Pasar la variable de entorno explícitamente
MULTIMEDIA_PATH="$MULTIMEDIA_PATH" node server.js
