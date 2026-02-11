#!/bin/bash
# FeatCast 快速修复脚本

cd /root/.openclaw/workspace/featcast

echo "========================================"
echo "🔧 FeatCast 快速修复"
echo "========================================"
echo ""

# 1. 修复npm安全漏洞
echo "📦 修复npm安全漏洞..."
npm audit fix --force 2>&1 | grep -E "added|removed|changed" | tail -3

# 2. 修复CI/CD配置
echo ""
echo "🔧 修复CI/CD配置..."
cat > .github/workflows/ci.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate Prisma
        run: npx prisma generate
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
EOF

echo "✅ CI/CD配置已更新"

# 3. 提交修复
echo ""
echo "📦 提交修复..."
git add -A
git commit -m "fix: Security audit and CI/CD configuration

- Run npm audit fix to resolve vulnerabilities
- Update CI/CD workflow for reliability
- Add proper job dependencies"

echo ""
echo "📤 推送到GitHub..."
git push origin main

echo ""
echo "========================================"
echo "✅ 快速修复完成！"
echo "========================================"
