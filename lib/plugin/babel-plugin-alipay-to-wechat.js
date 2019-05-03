"use strict";
/**
 * Created by：CaMnter
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var babel_plugin_base_applet_1 = require("./base/babel-plugin-base-applet");
var BabelPluginAlipayToWechat = /** @class */ (function (_super) {
    tslib_1.__extends(BabelPluginAlipayToWechat, _super);
    function BabelPluginAlipayToWechat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BabelPluginAlipayToWechat.prototype.createPlugin = function () {
        var _identifierHook = this.identifierHook.bind(this);
        var _memberExpressionHook = this.memberExpressionHook.bind(this);
        return function () {
            return {
                name: 'babel plugin alipay to wechat',
                visitor: {
                    /**
                     * my
                     *
                     * @param path
                     * @param appletType
                     * @constructor
                     */
                    Identifier: function (path) {
                        _identifierHook(path, babel_plugin_base_applet_1.AppletType.my);
                    },
                    /**
                     * my['request']
                     *
                     * my.request
                     * my[functionName]
                     *
                     * @param path path
                     * @constructor constructor
                     */
                    MemberExpression: function (path) {
                        _memberExpressionHook(path, babel_plugin_base_applet_1.AppletType.my);
                    },
                }
            };
        };
    };
    return BabelPluginAlipayToWechat;
}(babel_plugin_base_applet_1.BabelPluginBaseApplet));
exports.BabelPluginAlipayToWechat = BabelPluginAlipayToWechat;
//# sourceMappingURL=babel-plugin-alipay-to-wechat.js.map