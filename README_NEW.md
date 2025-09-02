# AnimeFlix3 项目说明文档

## 1. 项目简介
AnimeFlix3 是一个基于 Next.js 的动漫信息聚合平台，前端采用 React + TailwindCSS，数据接口现已切换为 consumet 的 vercel 部署（https://api-consumet-org-psi-nine.vercel.app/）。

## 2. 目录结构说明
- `components/`：页面 UI 组件
- `network/`：接口请求与工具
- `pages/`：Next.js 路由页面
- `public/`：静态资源
- `styles/`：全局样式

## 3. API 接口说明
所有数据请求统一通过 `network/requests.js`，基础地址在 `network/utils.js` 中配置（`API_BASE_URL`）。如需更换数据源，只需修改该变量。

consumet API 文档参考：https://docs.consumet.org/

常用 anime 相关接口举例：
- `/anime/gogoanime/{query}`：搜索动漫
- `/anime/gogoanime/info/{id}`：获取动漫详情
- `/anime/gogoanime/watch/{episodeId}`：获取播放源

如需自定义参数，建议参考 consumet 官方 API 文档。

## 4. 本地开发
```bash
yarn install
yarn dev
```
默认端口为 3000，可通过 http://localhost:3000 访问。

## 5. 部署建议
- 推荐使用 Vercel、Netlify 部署，无需自建后端。
- 若需自定义 API，可 fork consumet/api.consumet.org 并自行部署。

## 6. 二次开发建议
- UI 组件全部解耦，方便扩展和替换
- 数据请求集中管理，便于切换数据源
- 支持 SSR/SSG，可按需优化 SEO
- 建议增加错误处理与加载状态提示
- 可集成用户系统、弹幕、评论等互动功能

## 7. 常见问题
- 如遇到 API 限流或不可用，可更换 API_BASE_URL 或自建接口
- 如需支持更多数据源，参考 consumet 支持的其他 provider

## 8. 联系与支持
如需技术支持或有定制化需求，欢迎 issue 或 PR。
