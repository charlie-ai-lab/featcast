#!/bin/bash
# Deploy FeatCast to Vercel

echo "🚀 Deploying FeatCast to Vercel..."

# 检查是否安装了vercel CLI
if command -v vercel &> /dev/null; then
    vercel --prod
else
    # 使用npx运行vercel
    npx vercel --prod
fi

echo "✅ Deployment complete!"
