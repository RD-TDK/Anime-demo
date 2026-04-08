# AnimeJS Animation Demo

这是一个用 Vue 3 + Vite 构建的动画演示项目，主要用于展示基于 Web Animations API 的常见动画（淡入/淡出、滑入/滑出、缩放、旋转、弹跳、抖动等），并且包含参数实时调整、序列/交错/路径/组合动画示例。

## 技术栈
- Vue 3 (Composition API)
- Vite
- Pinia (状态管理)
- Vue Router
- Web Animations API（封装在 `src/utils/animal.js`）

## 项目结构（简要）
- `index.html` - Vite 入口
- `src/main.js` - 应用入口，挂载 Pinia 与 Router
- `src/App.vue` - 根组件，包含导航与路由视图
- `src/components/` - 通用组件（导航、语言切换等）
- `src/pages/` - 演示页面（Home、BasicAnimations、ParameterControl、AdvancedAnimations）
- `src/stores/` - Pinia 状态（language、animation）
- `src/utils/animal.js` - 动画封装与预定义动画

## 快速开始
要求 Node.js >= 16

1. 安装依赖

```powershell
npm install
```

2. 本地启动开发服务器

```powershell
npm run dev
```

3. 在浏览器打开（默认）

http://localhost:3000/

或查看终端所显示的实际地址与端口。

4. 打包为生产环境

```powershell
npm run build
npm run preview
```

## 作业要求与本仓库对照
作业要求（简要）包括：

- 选择并演示一个未在课程中覆盖的工具/框架/技术，并准备 tutorial。
- 提交代码并包含足够的 README 文档使他人在本机运行。
- 提交一段大约 15 分钟的视频演示，说明如何运行、项目结构、设计思路与对比分析。
- 将代码提交到课程的 GitHub Classroom 提供的仓库（包含 `.gitignore`、README 等）。

本仓库当前状态：

- 代码与演示页面已实现（动画示例、参数控制、语言切换、路由与状态管理）。
- 已添加 `README.md`（此文件）和 `.gitignore`。
- 需补充：录制并上传 15 分钟视频；在 `README.md` 中补充作业报告/对比分析章节（可在 `docs/` 添加更详细的 assignment.md）；若要提交到 GitHub Classroom，请将代码推送到课堂仓库并在 README 中写入仓库链接。

## 你需要准备的交付物（建议清单）
1. 代码仓库（包含 README.md, .gitignore, package.json）并推送到 GitHub Classroom 提供的仓库。
2. 一段 15 分钟的视频（录像内容建议：项目简介 → 运行演示 → 代码结构讲解 → 关键实现点讲解（如 `animal.js` 封装）→ 对比分析 → 总结）。
3. README 中增加“教学大纲 / 评分对应项”以方便评审。

## 如何让我继续帮你
- 我可以把 README.md 扩充成更详细的 assignment guide（包含示例截图、对比段落模板与录制提纲）。
- 我可以把仓库初始化为 Git（若尚未）并生成 `.gitignore`（已完成），并可将代码提交到你指定的远程仓库（需你提供远程仓库 URL 与权限）。
- 我可以启动开发服务器并把控制台输出贴回给你，帮助排查任何启动时错误。

---
如果你希望我现在继续做：
- 1) 我可以把 README.md 增补更多“教学/对比”段落并生成 `docs/assignment.md`；
- 2) 或立即运行 `npm run dev` 并贴出终端日志。
