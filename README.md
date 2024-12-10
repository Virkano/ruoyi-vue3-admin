## 安装使用

- node

v18.16.0

- pnpm下载

默认有`node`就有`npm`,之后设置镜像源

```bash
npm config set registry https://registry.npmmirror.com

npm i -g pnpm
```

-   安装依赖

```bash
pnpm install
```

-   运行

```bash
pnpm run dev
```

-   发布阿里云测试环境 密码跟开发沟通获取

```bash
pnpm run deploy:prod
```

-   git提交钩子（未配置）

> 代码 pnpm run lint:eslint 通过后才允许提交，代码提交会自动直接代码格式化校验

> 需添加提交类型 见：commitlint.config.cjs

> git add . & pnpm run commit 提交，会走git钩子，此时代码全量提交
