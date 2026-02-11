# 🤝 贡献指南

感谢您考虑为 FeatCast 贡献代码！

## 📋 目录

- [行为准则](#行为准则)
- [开始贡献](#开始贡献)
- [开发环境设置](#开发环境设置)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)

## 📖 行为准则

请尊重并友善地对待社区中的每一个人。我们遵循 [Contributor Covenant](https://www.contributor-covenant.org/) 行为准则。

## 🚀 开始贡献

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 💻 开发环境设置

```bash
# 1. 克隆您的 Fork
git clone https://github.com/YOUR-USERNAME/featcast.git
cd featcast

# 2. 安装依赖
npm install

# 3. 设置环境变量
cp .env.example .env
# 编辑 .env 文件配置必要的环境变量

# 4. 初始化数据库
npx prisma db push

# 5. 启动开发服务器
npm run dev
```

## 📝 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 类型 (Type)

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响含义）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建过程或辅助工具的更改

### 示例

```
feat(ai): Add GPT-4o support for commit rewriting

- Support multiple language generation
- Add customizable tone options

Closes #123
```

## 🔄 Pull Request 流程

1. 确保所有测试通过
2. 更新文档（如有必要）
3. PR 描述应包含：
   - 更改的目的
   - 重大更改的说明
   - 关联的 Issue（如果有）

## 🐛 报告问题

如果您发现了问题，请创建一个 [Issue](https://github.com/charlie-ai-lab/featcast/issues)，并包含：

- 问题的清晰描述
- 重现步骤
- 预期行为
- 实际行为
- 截图（如适用）

---

再次感谢您的贡献！ 🙏
