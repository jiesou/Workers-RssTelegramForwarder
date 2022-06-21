# Workers-RssTelegramForwarder

[![licence](https://img.shields.io/github/license/jiesou/Workers-RssTelegramForwarder)](https://github.com/jiesou/Workers-RssTelegramForwarder/LICENSE) 
[![stars](https://img.shields.io/github/stars/jiesou/Workers-RssTelegramForwarder)](https://github.com/jiesou/Workers-RssTelegramForwarder) 
 
[中文](#中文)

This is a script that automatically forward RSS feed to Telegram

A Telegram channel that uses this script: [@chen_thisChannel](https://t.me/chen_thisChannel)

Using [Cloudflare Workers](https://workers.cloudflare.com/) and [Workers KV](https://www.cloudflare.com/zh-cn/products/workers-kv/), [Cron Triggers](https://developers.cloudflare.com/workers/platform/cron-triggers)

## Pre-requisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) and a Github account
- A [Telegram Bot and its key](https://core.telegram.org/bots#3-how-do-i-create-a-bot)
- An RSS feed to forward with and a Telegram session to forward to (could be a channel, group or **you! **)

## Start!

### Use the "Deploy" button

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/jiesou/Workers-RssTelegramForwarder)

1. Just click the button above and follow the step 🙂
2. You should end up with a clone of your current repository. Find **Your new GitHub repository > Settings > Secrets** and set the following Secrets
```
- Name: CF_API_TOKEN
[should-be-added-automatically]

- Name: CF_ACCOUNT_ID
[should-be-added-automatically]

- Name: RSS_URL
- Value: [the-rss-you-need-to-forward]

- Name: TELEGRAM_TOKEN
- Value: [your-telegram-bot-token]

- Name: TELEGRAM_CHATID
- Value: [the-telegram-chatid-you-need-to-forward-to, please Google;)]
```
3. Click on **Actions** above the repository and enable them
4. 🎉
5. edit `wrangler.toml` and customize the Cron trigger (optional)

You can open your `*.*.worker.dev` domain to update manually, or automatically based on your set cron

### Deployment with Wrangler CLI

1. [Install, login the Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started)
2. Find the Workers KV in the Cloudflare Dashboard, create the Workers KV namespace and copy its ID
3. Edit `wrangler.toml` to adjust environment variables and KV namespace ID
4. `wrangler publish`

## Some restrictions

- The free CPU time per Workers request is only 10ms, and it will not be able to parse slightly larger RSS. According to my test, RSS of 100k size / 10 items or so is ok
- Free Workers requests are limited to 100,000 per day, and Workers KV reads 100,000 times and writes 1,000 times. If you forward RSS every minute, its need 24*60*60=86,400 requests a day (requests from Workers also need to be billed, and each request needs to read and write Workers KV once), which may exceed the free quota. The default Cron is once per hour

## Compatibility issues

This script uses [htmlparser2](https://github.com/fb55/htmlparser2) to parse RSS and uses `link` for duplicate item detection

## 中文

这是一个可以将 RSS 自动同步转发到 Telegram 的脚本

一个使用该脚本的 Telegram 频道：[@chen_thisChannel](https://t.me/chen_thisChannel)

使用 [Cloudflare Workers](https://workers.cloudflare.com/) 以及 [Workers KV](https://www.cloudflare.com/zh-cn/products/workers-kv/)、[Cron 触发器](https://developers.cloudflare.com/workers/platform/cron-triggers)

## 预先准备

- 一个 [Cloudflare 账号](https://dash.cloudflare.com/sign-up) 和 Github 账号
- 一个 [Telegram Bot 及其密钥](https://core.telegram.org/bots#3-how-do-i-create-a-bot)
- 一个需要同步的RSS和需要同步到的 Telegram 会话（可以是频道、群组或者**你！**）

## 开始！

### 使用“Deploy”按钮

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/jiesou/Workers-RssTelegramForwarder)

1. 点上面的按钮并跟着下一步🙂
2. 最后你应该会将当前仓库克隆。找到**你的新 GitHub 仓库 > Settings > Secrets**，并设置如下 Secrets
```
- Name: CF_API_TOKEN 
[应该已被自动添加]

- Name: CF_ACCOUNT_ID
[应该已被自动添加]

- Name: RSS_URL
- Value: [你需要同步的RSS]

- Name: TELEGRAM_TOKEN
- Value: [你的 Telegram Bot 密钥]

- Name: TELEGRAM_CHATID
- Value: [你需要转发到的 Telegram 会话 ID，请谷歌 ;)]
```
3. 点击仓库上方的 **Actions** 并启用
4. 🎉
5. 编辑 `wrangler.toml` 并自定义 Cron 触发器（可选）

你可以向你的 `*.*.worker.dev` 域名发出请求来手动更新，或者根据设置的 Cron 自动更新

### 使用 Wrangler CLI 部署

1. [安装、登录 Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started)
2. 在 Cloudflare Dashboard 中找到 Workers KV，创建 Workers KV 命名空间并复制其 ID
3. 编辑 `wrangler.toml` 取消注释并设置环境变量和 KV 命名空间 ID
4. `wrangler publish`

## 一些限制

- 每次 Workers 请求的免费 CPU 时间只有 10ms，稍大的 RSS 它将无法解析。据我测试，100k大小 / 10 个项目左右的 RSS 没有问题
- 每天免费的 Workers 请求限制为 100,000 个，Workers KV 读取 100,000 次，写入 1,000 次。如果每分钟都同步 RSS，一天就需要 24*60*60=86400 次请求（从 Workers 发出的请求也需要计费，且每次同步需要读写一次 Workers KV），可能会超出免费配额。默认的 Cron 为每小时一次

## 兼容性问题

这个脚本使用 [htmlparser2](https://github.com/fb55/htmlparser2) 来解析 RSS，并使用 `link` 进行项目的重复检测