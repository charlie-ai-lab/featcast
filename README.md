# 🚀 FeatCast - AI产品更新广播器

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript 5.0">
  <img src="https://img.shields.io/badge/Prisma-5.0-2D4F58?style=for-the-badge&logo=prisma" alt="Prisma 5.0">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License">
  <img src="https://img.shields.io/badge/GitHub-Open Source-white?style=for-the-badge&logo=github">
</p>

<p align="center">
  ✨ AI-powered产品更新广播器 - 自动将GitHub提交转换为社交媒体帖子
</p>

<p align="center">
  <a href="https://github.com/charlie-ai-lab/featcast">
    <img src="https://img.shields.io/github/stars/charlie-ai-lab/featcast?style=flat-square&logo=github">
  </a>
  <a href="https://github.com/charlie-ai-lab/featcast">
    <img src="https://img.shields.io/github/forks/charlie-ai-lab/featcast?style=flat-square&logo=github">
  </a>
</p>

## ✨ 功能特性

- 🤖 **AI智能改写** - 使用OpenAI GPT-4o自动生成吸引人的社交媒体文案
- 🐦 **多平台支持** - 支持X(Twitter)、小红书、微信公众号等多平台发布
- 📅 **定时发布** - 支持Cron定时任务，自动每天发布更新
- 🔗 **GitHub集成** - 一键连接GitHub仓库，自动获取提交历史
- 🎨 **风格可选** - 支持专业、友好、幽默等多种文案风格
- 🌐 **国际化** - 支持中文、英文、日文等多种语言

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/charlie-ai-lab/featcast.git
cd featcast
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# 数据库
DATABASE_URL="file:./dev.db"

# GitHub OAuth (可选)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Twitter/X API
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret

# 小红书 API
XIAOHONGSHU_CLIENT_ID=your_xiaohongshu_client_id
XIAOHONGSHU_CLIENT_SECRET=your_xiaohongshu_client_secret

# OpenAI (AI改写功能)
OPENAI_API_KEY=your_openai_api_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. 初始化数据库

```bash
npx prisma db push
npx prisma generate
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
featcast/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API 路由
│   │   ├── cron/          # 定时发布
│   │   ├── github/        # GitHub 集成
│   │   ├── platforms/     # 多平台发布
│   │   └── publish/       # 发布功能
│   ├── settings/          # 设置页面
│   └── page.tsx           # 首页
├── components/             # React 组件
├── lib/                   # 工具库
│   ├── ai.ts             # AI 改写
│   ├── github.ts          # GitHub API
│   ├── twitter.ts         # X/Twitter API
│   └── platforms/         # 平台抽象层
├── prisma/                # 数据库
│   └── schema.prisma      # Prisma Schema
└── public/                # 静态资源
```

## 🔧 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **后端**: Next.js API Routes
- **数据库**: SQLite + Prisma ORM
- **AI**: OpenAI GPT-4o
- **定时任务**: Vercel Cron
- **部署**: Vercel (推荐)

## 📝 使用指南

### 连接GitHub仓库

1. 进入设置页面
2. 点击"连接GitHub"
3. 选择要连接的仓库

### 创建发布计划

1. 设置定时任务（Cron表达式）
2. 选择语言和文案风格
3. 启用计划

### 手动发布

1. 选择要发布的提交
2. 预览AI生成的文案
3. 选择发布平台
4. 点击发布

## 🤝 贡献指南

欢迎贡献代码！请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [OpenAI](https://openai.com/)
- [Prisma](https://prisma.io/)
- [Vercel](https://vercel.com/)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/charlie-ai-lab">Charlie AI Lab</a>
</p>
