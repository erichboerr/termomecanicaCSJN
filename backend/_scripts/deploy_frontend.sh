#!/bin/bash

# Ruta del build generado por Vite
BUILD_DIR="/root/termomecanicaCSJN-postgeSQL/frontend/dist"

# Ruta pública de Nginx
NGINX_HTML="/var/www/html"

# Fecha actual para version.txt
DEPLOY_DATE=$(date +"%Y-%m-%d %H:%M")

echo "🧼 Borrando contenido viejo de $NGINX_HTML..."
rm -rf $NGINX_HTML/*

echo "📦 Copiando nuevo build desde $BUILD_DIR..."
cp -r $BUILD_DIR/* $NGINX_HTML/

echo "🧪 Generando version.txt..."
echo "Deploy: $DEPLOY_DATE" > $NGINX_HTML/version.txt

echo "🔁 Reiniciando Nginx..."
systemctl restart nginx

echo "✅ Deploy completado: $DEPLOY_DATE"