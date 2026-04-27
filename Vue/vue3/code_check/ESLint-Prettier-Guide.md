# ESLint + Prettier 使用指南

本项目集成了 ESLint 8 和 Prettier，用于代码规范检查和格式化。

## 目录

- [ESLint](#eslint)
  - [安装](#eslint-安装)
  - [配置](#eslint-配置)
  - [运行](#eslint-运行)
- [Prettier](#prettier)
  - [安装](#prettier-安装)
  - [配置](#prettier-配置)
  - [运行](#prettier-运行)
- [联合使用](#联合使用)

---

## ESLint

ESLint 是一个用于识别和报告 JavaScript/TypeScript 代码问题的工具，帮助保持代码一致性。

### ESLint 安装

在项目根目录执行以下命令安装 ESLint 8 及相关依赖：

```bash
npm install eslint@8 --save-dev
```

对于 Vue 3 项目，还需要安装以下插件：

```bash
npm install eslint-plugin-vue@9 --save-dev
npm install @vue/eslint-config-standard --save-dev
```

完整安装命令：

```bash
npm install eslint@8 eslint-plugin-vue@8 @vue/eslint-config-standard --save-dev
```

### ESLint 配置

在项目根目录创建 `.eslintrc.cjs` 文件：

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  }
}
```

配置说明：

| 配置项          | 说明                               |
| --------------- | ---------------------------------- |
| `root`          | 设置为 true 表示这是项目根目录配置 |
| `env`           | 定义预定义的全局变量环境           |
| `extends`       | 继承现有的配置规则集               |
| `parserOptions` | 解析器选项配置                     |
| `rules`         | 自定义规则覆盖                     |

常用规则说明：

| 规则           | 说明     |
| -------------- | -------- |
| `off` 或 `0`   | 关闭规则 |
| `warn` 或 `1`  | 警告     |
| `error` 或 `2` | 错误     |

### ESLint 运行

在 `package.json` 的 `scripts` 中添加：

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  }
}
```

运行命令：

```bash
# 检查代码问题
npm run lint

# 自动修复部分问题
npm run lint -- --fix
```

---

## Prettier

Prettier 是一个代码格式化工具，支持多种语言，保持代码风格一致。

### Prettier 安装

```bash
npm install prettier --save-dev
```

### Prettier 配置

在项目根目录创建 `.prettierrc` 文件：

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "none",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "vueIndentScriptAndStyle": false
}
```

配置说明：

| 配置项                    | 说明          | 可选值                 |
| ------------------------- | ------------- | ---------------------- |
| `semi`                    | 语句末尾分号  | `true` / `false`       |
| `singleQuote              | 使用单引号    | `true` / `false`       |
| `tabWidth`                | 缩进宽度      | 数字                   |
| `useTabs`                 | 使用 Tab 缩进 | `true` / `false`       |
| `trailingComma`           | 尾随逗号      | `none` / `es5` / `all` |
| `printWidth`              | 行最大长度    | 数字                   |
| `bracketSpacing`          | 对象括号空格  | `true` / `false`       |
| `arrowParens`             | 箭头函数括号  | `always` / `avoid`     |
| `endOfLine`               | 行尾换行符    | `lf` / `crlf` / `cr`   |
| `vueIndentScriptAndStyle` | Vue 文件缩进  | `true` / `false`       |

可以创建 `.prettierignore` 文件忽略不需要格式化的文件：

```
node_modules
dist
dist-ssr
*.local
```

### Prettier 运行

在 `package.json` 的 `scripts` 中添加：

```json
{
  "scripts": {
    "format": "prettier --write --ignore-path .gitignore \"**/*.{vue,js,jsx,json,css,html,md}\""
  }
}
```

运行命令：

```bash
# 格式化代码
npm run format

# 检查格式（不修改文件）
npm run format -- --check
```

---

## 联合使用

ESLint 和 Prettier 配合使用需要解决冲突问题，需要安装相关依赖：

```bash
npm install eslint-config-prettier --save-dev
```

### 解决冲突

更新 `.eslintrc.cjs` 文件，在 `extends` 中添加 `prettier`：

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  }
}
```

`eslint-config-prettier` 会关闭所有与 Prettier 冲突的 ESLint 规则。

### 快捷命令

可以在 `package.json` 中添加组合命令：

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
    "format": "prettier --write --ignore-path .gitignore \"**/*.{vue,js,jsx,json,css,html,md}\"",
    "lint:check": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --ignore-path .gitignore",
    "format:check": "prettier --check --ignore-path .gitignore \"**/*.{vue,js,jsx,json,css,html,md}\""
  }
}
```

运行所有检查：

```bash
# 检查代码格式和规范
npm run lint:check
npm run format:check
```

自动修复：

```bash
# 自动修复格式和规范问题
npm run lint
npm run format
```

---

## VS Code 配置（推荐）

在 `.vscode/settings.json` 中添加以下配置（如果不存在则创建）：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "files.autoFixOnSave": true
}
```

需要安装 VS Code 插件：

- ESLint
- Prettier - Code formatter

---

## 常用命令汇总

```bash
# 安装依赖
npm install eslint@8 eslint-plugin-vue@9 @vue/eslint-config-standard prettier eslint-config-prettier --save-dev

# 检查代码问题（不修改）
npm run lint:check
npm run format:check

# 自动修复
npm run lint
npm run format
```
