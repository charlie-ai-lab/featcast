#!/bin/bash
# FeatCast 自主运营脚本
# 每2小时自动运行

echo "========================================"
echo "🚀 FeatCast 自主运营"
echo "========================================"
echo ""

cd /root/.openclaw/workspace/featcast

# 1. 获取GitHub状态
echo "📊 获取GitHub状态..."
STARS=$(curl -s "https://api.github.com/repos/charlie-ai-lab/featcast" | grep -o '"stargazers_count": [0-9]*' | grep -o '[0-9]*')
FORKS=$(curl -s "https://api.github.com/repos/charlie-ai-lab/featcast" | grep -o '"forks_count": [0-9]*' | grep -o '[0-9]*')
ISSUES=$(curl -s "https://api.github.com/repos/charlie-ai-lab/featcast" | grep -o '"open_issues_count": [0-9]*' | grep -o '[0-9]*')

echo "⭐ Stars: $STARS"
echo "🔀 Forks: $FORKS"
echo "🐛 Issues: $ISSUES"

# 2. 检查CI/CD
echo ""
echo "🔄 检查CI/CD..."
CI_STATUS=$(curl -s "https://api.github.com/repos/charlie-ai-lab/featcast/actions/runs?per_page=1" | grep -o '"conclusion": "[^"]*"' | head -1 | cut -d'"' -f4)
echo "CI/CD状态: ${CI_STATUS:-unknown}"

# 3. 检查新Issues
echo ""
echo "🐛 检查新Issues..."
curl -s "https://api.github.com/repos/charlie-ai-lab/featcast/issues?state=open&per_page=5" | grep -o '"title": "[^"]*"' | head -5 | sed 's/"title": "//' | sed 's/"//'

# 4. 运行快速测试
echo ""
echo "🧪 运行快速测试..."
npm run build --silent 2>&1 | tail -5 || echo "构建可能存在问题"

# 5. 更新运营日志
echo ""
echo "📝 更新运营日志..."
echo "[$(date '+%Y-%m-%d %H:%M')] Stars: $STARS, Forks: $FORKS, Issues: $ISSUES, CI: $CI_STATUS" >> /root/.openclaw/workspace/logs/featcast-operations.log

echo ""
echo "========================================"
echo "✅ 运营检查完成"
echo "========================================"
