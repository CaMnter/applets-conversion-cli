"use strict";
/**
 * Created by：CaMnter
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var babel_plugin_base_applet_1 = require("./base/babel-plugin-base-applet");
var BabelPluginWechatToAlipay = /** @class */ (function (_super) {
    tslib_1.__extends(BabelPluginWechatToAlipay, _super);
    function BabelPluginWechatToAlipay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BabelPluginWechatToAlipay.prototype.createPlugin = function () {
        var _identifierHook = this.identifierHook.bind(this);
        var _memberExpressionHook = this.memberExpressionHook.bind(this);
        return function () {
            return {
                name: 'babel plugin wechat to alpay',
                visitor: {
                    /**
                     * wx
                     *
                     * @param path
                     * @param appletType
                     * @constructor
                     */
                    Identifier: function (path) {
                        _identifierHook(path, babel_plugin_base_applet_1.AppletType.wx);
                    },
                    /**
                     * wx['request']
                     *
                     * wx.request
                     * wx[functionName]
                     *
                     * @param path path
                     * @constructor constructor
                     */
                    MemberExpression: function (path) {
                        _memberExpressionHook(path, babel_plugin_base_applet_1.AppletType.wx);
                    },
                }
            };
        };
    };
    return BabelPluginWechatToAlipay;
}(babel_plugin_base_applet_1.BabelPluginBaseApplet));
exports.BabelPluginWechatToAlipay = BabelPluginWechatToAlipay;
//# sourceMappingURL=babel-plugin-wechat-to-alipay.js.map