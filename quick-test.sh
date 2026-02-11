#!/bin/bash
echo "🚀 FeatCast快速测试..."
echo ""

# 1. 检查Node环境
echo "📋 Node环境:"
node --version
npm --version

# 2. 检查文件结构
echo ""
echo "📁 项目结构:"
ls -la

# 3. 检查依赖
echo ""
echo "📦 依赖检查:"
npm list --depth=0 2>/dev/null | head -10 || echo "需要先运行 npm install"

# 4. 检查API文件
echo ""
echo "🔗 API端点:"
find app/api -name "route.ts" | head -10

echo ""
echo "✅ 快速测试完成"
echo "📝 完整测试需要: npm install && npm test"
