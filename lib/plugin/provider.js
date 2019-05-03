"use strict";
/**
 * Created by：CaMnter
 */
Object.defineProperty(exports, "__esModule", { value: true });
var babel_plugin_wechat_to_alipay_1 = require("./babel-plugin-wechat-to-alipay");
var babel_plugin_alipay_to_wechat_1 = require("./babel-plugin-alipay-to-wechat");
function getBabelPluginWechatToAlipay() {
    return new babel_plugin_wechat_to_alipay_1.BabelPluginWechatToAlipay().createPlugin();
}
exports.getBabelPluginWechatToAlipay = getBabelPluginWechatToAlipay;
function getBabelPluginAlipayToWechat() {
    return new babel_plugin_alipay_to_wechat_1.BabelPluginAlipayToWechat().createPlugin();
}
exports.getBabelPluginAlipayToWechat = getBabelPluginAlipayToWechat;
//# sourceMappingURL=provider.js.map