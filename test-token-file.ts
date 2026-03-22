import fs from "node:fs";

const envStr = fs.readFileSync("C:/Users/15013/.openclaw/.baoyu-skills/.env", "utf-8");
let appId, appSecret;
for (const line of envStr.split("\n")) {
  if (line.startsWith("WECHAT_APP_ID=")) appId = line.split("=")[1].trim();
  if (line.startsWith("WECHAT_APP_SECRET=")) appSecret = line.split("=")[1].trim();
}

const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
fetch(url).then(r => r.json()).then(data => {
  fs.writeFileSync("C:/Users/15013/.openclaw/wechat_token_error.json", JSON.stringify(data, null, 2));
}).catch(console.error);
