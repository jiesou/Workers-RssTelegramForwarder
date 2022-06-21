var htmlparser2 = require('htmlparser2');

async function sendTgMsg(env, item) {
  let fetchUrl = 'https://api.telegram.org/' + env.TELEGRAM_TOKEN + '/sendMessage';
  let body = {
    'chat_link': env.TELEGRAM_CHATID,
    'text': item.title + '\n' + 
      new Date(item.pubDate).toLocaleString('en-US',
        { hour12: true,
          timeStyle: 'short' }) + '\n' + 
      item.link
   };
  await fetch(fetchUrl, { method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)})
    .catch(error => sendTgMsg(env, item));
}

async function forwardToTg(env) {
  let res = await fetch(env.RSS_URL)
    .catch(error => forwardToTg(env));
  let feed = htmlparser2.parseFeed(await res.text());
  let lastLink = await env.KV.get('lastLink');
  await env.KV.put('lastLink', String(feed.items[0].link));
  let items = feed.items.reverse()
  let nowIndex = items.findIndex(item => {
    return item.link === lastLink;
  }) + 1;
  for (let index=nowIndex; index<items.length; index++) {
    let item = items[index];
    await sendTgMsg(env, item);
  }
  return JSON.stringify(feed);
}

export default {
  async fetch(request, env) {
    let res = await forwardToTg(env);
    return new Response(await res);
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(forwardToTg(env));
  }
};
