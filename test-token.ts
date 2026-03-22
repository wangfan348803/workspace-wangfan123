import fs from "node:fs";

const envStr = fs.readFileSync("C:/Users/15013/.openclaw/.baoyu-skills/.env", "utf-8");
let appId, appSecret;
for (const line of envStr.split("\n")) {
  if (line.startsWith("WECHAT_APP_ID=")) appId = line.split("=")[1].trim();
  if (line.startsWith("WECHAT_APP_SECRET=")) appSecret = line.split("=")[1].trim();
}

console.log("AppID:", appId);
console.log("AppSecret length:", appSecret?.length);

const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
fetch(url).then(r => r.json()).then(console.log).catch(console.error);
