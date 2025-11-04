<div style="text-align: center">

# MAA Star Resonance

![Typescript](https://img.shields.io/badge/Typescript-8A2BE2?logo=typescript)
![license](https://img.shields.io/github/license/26F-Studio/maa-star-resonance)
![activity](https://img.shields.io/github/commit-activity/m/26F-Studio/maa-star-resonance?color=%23ff69b4)
![stars](https://img.shields.io/github/stars/26F-Studio/maa-star-resonance?style=social)

**一个由 Quasar 和 MAA 框架驱动的星痕共鸣小助手**

*此应用程序仅适用于安卓模拟器和设备。*

</div>

## 目录

- [截图](#截图)
- [使用方法](#使用方法)
- [开发设置](#开发设置)

## 截图

![screenshot](./.github/assets/screenshot.png)

## 使用方法

### 自动钓鱼

此工作流可自动执行钓鱼过程。

1.  确保你的角色在游戏中的钓鱼点。
2.  选择具有正确端口的设备。
3.  选择“自动钓鱼”工作流。
4.  在工作流信息面板底部设置运行次数。
5.  点击“运行工作流”以开始自动钓鱼过程。

### 广播消息

此工作流可自动在特定世界频道中发送消息。

1.  点击右上角的齿轮图标，打开工作流配置抽屉。
2.  设置起始频道和结束频道。
3.  再次点击齿轮图标，关闭工作流配置抽屉。
4.  在工作流信息面板底部设置运行次数。
5.  点击“运行工作流”以开始广播消息。

## 开发设置

### 安装依赖

```bash
pnpm install
```

### 在开发模式下启动应用（热代码重载、错误报告等）

```bash
pnpm run dev
```

### Lint 文件

```bash
pnpm run lint
```

### 格式化文件

```bash
pnpm run format
```

### 构建用于生产的应用

```bash
pnpm run publish
```

