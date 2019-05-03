/**
 * Created by：CaMnter
 */

import { BabelPluginWechatToAlipay } from "./babel-plugin-wechat-to-alipay";
import { BabelPluginAlipayToWechat } from "./babel-plugin-alipay-to-wechat";

export function getBabelPluginWechatToAlipay() {
  return new BabelPluginWechatToAlipay().createPlugin();
}

export function getBabelPluginAlipayToWechat() {
  return new BabelPluginAlipayToWechat().createPlugin();
}