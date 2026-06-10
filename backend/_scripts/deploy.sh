#!/bin/bash
echo "🚀 Iniciando deploy..."

cd /root/termomecanicaCSJN-postgeSQL

echo "📥 Trayendo cambios..."
git pull origin main

echo "📦 Instalando dependencias backend..."
cd backend && npm install

echo "🏗️ Buildeando frontend..."
cd ../frontend && npm install && npm run build

echo "🔄 Reiniciando PM2..."
cd ..
pm2 stop backend
pm2 start ecosystem.config.cjs --env production
pm2 save

echo "✅ Deploy completado"