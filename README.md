# Workers-RssTelegramForwarder

[![licence](https://img.shields.io/github/license/jiesou/Workers-RssTelegramForwarder)](https://github.com/jiesou/Workers-RssTelegramForwarder/LICENSE) 
[![stars](https://img.shields.io/github/stars/jiesou/Workers-RssTelegramForwarder)](https://github.com/jiesou/Workers-RssTelegramForwarder) 
 
[δΈ­ζ](#δΈ­ζ)

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

1. Just click the button above and follow the step π
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
4. π
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

## δΈ­ζ

θΏζ―δΈδΈͺε―δ»₯ε° RSS θͺε¨εζ­₯θ½¬εε° Telegram ηθζ¬

δΈδΈͺδ½Ώη¨θ―₯θζ¬η Telegram ι’ιοΌ[@chen_thisChannel](https://t.me/chen_thisChannel)

δ½Ώη¨ [Cloudflare Workers](https://workers.cloudflare.com/) δ»₯ε [Workers KV](https://www.cloudflare.com/zh-cn/products/workers-kv/)γ[Cron θ§¦εε¨](https://developers.cloudflare.com/workers/platform/cron-triggers)

## ι’εεε€

- δΈδΈͺ [Cloudflare θ΄¦ε·](https://dash.cloudflare.com/sign-up) ε Github θ΄¦ε·
- δΈδΈͺ [Telegram Bot εεΆε―ι₯](https://core.telegram.org/bots#3-how-do-i-create-a-bot)
- δΈδΈͺιθ¦εζ­₯ηRSSειθ¦εζ­₯ε°η Telegram δΌθ―οΌε―δ»₯ζ―ι’ιγηΎ€η»ζθ**δ½ οΌ**οΌ

## εΌε§οΌ

### δ½Ώη¨βDeployβζι?

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/jiesou/Workers-RssTelegramForwarder)

1. ηΉδΈι’ηζι?εΉΆθ·ηδΈδΈζ­₯π
2. ζεδ½ εΊθ―₯δΌε°ε½εδ»εΊειγζΎε°**δ½ ηζ° GitHub δ»εΊ > Settings > Secrets**οΌεΉΆθ?Ύη½?ε¦δΈ Secrets
```
- Name: CF_API_TOKEN 
[εΊθ―₯ε·²θ’«θͺε¨ζ·»ε ]

- Name: CF_ACCOUNT_ID
[εΊθ―₯ε·²θ’«θͺε¨ζ·»ε ]

- Name: RSS_URL
- Value: [δ½ ιθ¦εζ­₯ηRSS]

- Name: TELEGRAM_TOKEN
- Value: [δ½ η Telegram Bot ε―ι₯]

- Name: TELEGRAM_CHATID
- Value: [δ½ ιθ¦θ½¬εε°η Telegram δΌθ― IDοΌθ―·θ°·ζ­ ;)]
```
3. ηΉε»δ»εΊδΈζΉη **Actions** εΉΆε―η¨
4. π
5. ηΌθΎ `wrangler.toml` εΉΆθͺε?δΉ Cron θ§¦εε¨οΌε―ιοΌ

δ½ ε―δ»₯εδ½ η `*.*.worker.dev` εεεεΊθ―·ζ±ζ₯ζε¨ζ΄ζ°οΌζθζ Ήζ?θ?Ύη½?η Cron θͺε¨ζ΄ζ°

### δ½Ώη¨ Wrangler CLI ι¨η½²

1. [ε?θ£γη»ε½ Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started)
2. ε¨ Cloudflare Dashboard δΈ­ζΎε° Workers KVοΌεε»Ί Workers KV ε½εη©Ίι΄εΉΆε€εΆεΆ ID
3. ηΌθΎ `wrangler.toml` εζΆζ³¨ιεΉΆθ?Ύη½?η―ε’ειε KV ε½εη©Ίι΄ ID
4. `wrangler publish`

## δΈδΊιεΆ

- ζ―ζ¬‘ Workers θ―·ζ±ηεθ΄Ή CPU ζΆι΄εͺζ 10msοΌη¨ε€§η RSS ε?ε°ζ ζ³θ§£ζγζ?ζζ΅θ―οΌ100kε€§ε° / 10 δΈͺι‘Ήη?ε·¦ε³η RSS ζ²‘ζι?ι’
- ζ―ε€©εθ΄Ήη Workers θ―·ζ±ιεΆδΈΊ 100,000 δΈͺοΌWorkers KV θ―»ε 100,000 ζ¬‘οΌεε₯ 1,000 ζ¬‘γε¦ζζ―ειι½εζ­₯ RSSοΌδΈε€©ε°±ιθ¦ 24*60*60=86400 ζ¬‘θ―·ζ±οΌδ» Workers εεΊηθ―·ζ±δΉιθ¦θ?‘θ΄ΉοΌδΈζ―ζ¬‘εζ­₯ιθ¦θ―»εδΈζ¬‘ Workers KVοΌοΌε―θ½δΌθΆεΊεθ΄Ήιι’γι»θ?€η Cron δΈΊζ―ε°ζΆδΈζ¬‘

## εΌε?Ήζ§ι?ι’

θΏδΈͺθζ¬δ½Ώη¨ [htmlparser2](https://github.com/fb55/htmlparser2) ζ₯θ§£ζ RSSοΌεΉΆδ½Ώη¨ `link` θΏθ‘ι‘Ήη?ηιε€ζ£ζ΅