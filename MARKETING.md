# FeatCast 推广文案

## 简短版 (Twitter/X)

🚀 **FeatCast - AI产品更新广播器**

自动将GitHub提交转换为社交媒体帖子，支持X/Twitter、小红书等多平台发布。

✨ AI智能改写 | 📅 定时发布 | 🌍 多语言

GitHub: https://github.com/charlie-ai-lab/featcast

#AI #Productivity #OpenSource

---

## 中等版 (小红书/技术社区)

### 🎉 开源新项目：FeatCast - 让产品更新自动化

作为开发者，你是否经常：
- 写了很棒的代码但忘记分享？
- 产品更新不知道发什么内容？
- 在多个平台重复发布同样的内容？

**FeatCast** 帮你解决这些问题！

### ✨ 核心功能

1. **🤖 AI智能改写**
   - 自动生成吸引人的社交媒体文案
   - 支持多种语言和风格
   - 基于你的提交记录智能提炼亮点

2. **📅 定时发布**
   - 设置Cron定时任务
   - 每天/每周自动发布
   - 不错过任何更新

3. **🌍 多平台支持**
   - X (Twitter)
   - 小红书
   - 微信公众号
   - 更多平台持续添加中...

4. **🔗 GitHub深度集成**
   - 一键连接仓库
   - 自动获取提交历史
   - 智能筛选重要更新

### 🛠️ 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **AI**: OpenAI GPT-4o
- **数据库**: SQLite + Prisma
- **部署**: Vercel

### 📦 快速开始

```bash
git clone https://github.com/charlie-ai-lab/featcast.git
cd featcast
npm install
npm run dev
```

### 🌟 支持我们

如果这个项目对你有帮助，欢迎：
- ⭐ Star我们的GitHub
- 🍴 Fork并贡献代码
- 🐛 提交Issue反馈
- 📢 分享给更多开发者

### 🔗 链接

- GitHub: https://github.com/charlie-ai-lab/featcast
- 文档: https://github.com/charlie-ai-lab/featcast#readme

---

## 完整版 (技术博客/Product Hunt)

### 🚀 FeatCast：AI驱动的产品更新广播平台

**让产品更新变得简单而有效**

作为独立开发者或小团队，你是否经常面临这些挑战：

- ✍️ **内容创作耗时**：每次产品更新都要绞尽脑汁写推广文案
- 📢 **多平台发布繁琐**：需要在不同平台重复发布相似内容
- ⏰ **时间管理困难**：写代码已经很忙，哪有时间做运营

**FeatCast** 正是为解决这些问题而生的！

### 🎯 产品定位

FeatCast是一个**AI驱动的产品更新广播平台**，专注于帮助开发者和小团队自动化产品更新的传播工作。

### 💡 核心价值

#### 1. AI智能内容生成

传统方式：
- 手动写推广文案：30-60分钟
- 反复修改调整：15-30分钟
- 多平台适配：20-45分钟

FeatCast方式：
- 一键生成AI优化文案：5秒
- 自动适配多平台：2秒
- 总耗时：从2小时缩短到10秒

#### 2. 自动化工作流

```
GitHub提交 → AI分析 → 内容改写 → 多平台发布 → 数据追踪
```

完全自动化，无需人工干预。

#### 3. 灵活的发布策略

- **定时发布**：每天9点自动发布昨天更新
- **即时发布**：重大更新立即推送
- **手动审核**：重要内容人工确认后发布

### 🏗️ 技术架构

```
┌─────────────────┐
│   GitHub OAuth   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   提交获取API    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI内容改写引擎   │
│  (GPT-4o)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  平台发布API     │
│  • X/Twitter    │
│  • 小红书        │
│  • 微信公众号    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   定时任务调度    │
│   (Vercel Cron) │
└─────────────────┘
```

### 🎨 界面预览

- 📊 **Dashboard**：一站式管理所有发布
- ⚙️ **Settings**：平台连接和配置
- 📈 **Analytics**：发布效果追踪
- 🔔 **Notifications**：重要事件通知

### 🛠️ 技术亮点

1. **Next.js 14 App Router**
   - 最新React服务端渲染
   - 优化的性能和开发体验

2. **Prisma ORM**
   - 类型安全的数据库操作
   - 简洁的Schema定义

3. **模块化平台架构**
   - 轻松添加新平台支持
   - 统一的发布接口

4. **完整的CI/CD**
   - GitHub Actions自动化测试
   - Vercel一键部署

### 📦 安装和使用

```bash
# 克隆项目
git clone https://github.com/charlie-ai-lab/featcast.git
cd featcast

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑.env文件，填入你的API密钥

# 初始化数据库
npx prisma db push

# 启动开发服务器
npm run dev
```

### 🔧 配置说明

```env
# 数据库
DATABASE_URL="file:./dev.db"

# GitHub OAuth (可选)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Twitter API
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 🌟 路线图

- [ ] v1.0.0：基础功能发布
- [ ] v1.1.0：更多平台支持（知乎、即刻）
- [ ] v1.2.0：AI图片生成
- [ ] v2.0.0：团队协作功能
- [ ] v2.1.0：数据分析仪表板

### 🤝 贡献指南

我们欢迎各种形式的贡献！

- 🐛 **报告Bug**：通过GitHub Issues
- 💡 **建议功能**：通过GitHub Discussions
- 🔧 **贡献代码**：Fork后提交Pull Request
- 📝 **改进文档**：直接编辑文档

### 📄 许可证

MIT License - 自由使用，友好开源

### 🔗 链接

- **GitHub**: https://github.com/charlie-ai-lab/featcast
- **文档**: https://github.com/charlie-ai-lab/featcast#readme
- **问题反馈**: https://github.com/charlie-ai-lab/featcast/issues

---

**让产品更新变得更简单！** 🚀
