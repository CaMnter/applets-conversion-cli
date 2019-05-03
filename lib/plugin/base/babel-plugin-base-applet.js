"use strict";
/**
 * Created by：CaMnter
 */
Object.defineProperty(exports, "__esModule", { value: true });
var wechat_to_alipay_map_1 = require("../map/wechat-to-alipay-map");
var alipay_to_wechat_map_1 = require("../map/alipay-to-wechat-map");
exports.babelTypes = require('@babel/types');
var AppletType;
(function (AppletType) {
    AppletType["wx"] = "wx";
    AppletType["my"] = "my";
})(AppletType = exports.AppletType || (exports.AppletType = {}));
;
var BabelType;
(function (BabelType) {
    BabelType["id"] = "id";
    BabelType["string"] = "string";
})(BabelType = exports.BabelType || (exports.BabelType = {}));
;
var BabelPluginBaseApplet = /** @class */ (function () {
    function BabelPluginBaseApplet() {
    }
    /**
     * ast「value」
     *
     * @param path { get?: Function }
     * @param key string
     */
    BabelPluginBaseApplet.prototype.getAstValue = function (path, key) {
        if (key && path.get && 'function' === typeof path.get) {
            return path.get(key).node;
        }
        else {
            return '';
        }
    };
    /**
     * object.name「value」
     *
     * @param path { get?: Function }
     */
    BabelPluginBaseApplet.prototype.getObjectNameValue = function (path) {
        return this.getAstValue(path, 'object.name');
    };
    /**
     * property.type「value」
     *
     * @param path { get?: Function }
     */
    BabelPluginBaseApplet.prototype.getPropertyTypeValue = function (path) {
        return this.getAstValue(path, 'property.type');
    };
    /**
     * property.name「value」
     *
     * @param path { get?: Function }
     */
    BabelPluginBaseApplet.prototype.getPropertyNameValue = function (path) {
        return this.getAstValue(path, 'property.name');
    };
    /**
     * property.value「value」
     *
     * @param path { get?: Function }
     */
    BabelPluginBaseApplet.prototype.getPropertyValueValue = function (path) {
        return this.getAstValue(path, 'property.value');
    };
    /**
     * name「value」
     *
     * @param path { get?: Function }
     */
    BabelPluginBaseApplet.prototype.getNameValue = function (path) {
        return this.getAstValue(path, 'name');
    };
    /**
     * property
     *
     * @param path { get?: Function }
     */
    BabelPluginBaseApplet.prototype.getProperty = function (path) {
        if (path.get && 'function' === typeof path.get) {
            return path.get('property');
        }
        else {
            return undefined;
        }
    };
    /**
     * replace property
     *
     * @param path { get?: Function }
     * @param type BabelType
     * @param name string
     */
    BabelPluginBaseApplet.prototype.replaceProperty = function (path, type, name) {
        var property = this.getProperty(path);
        if (property && property.replaceWith && 'function' === typeof property.replaceWith) {
            switch (type) {
                case BabelType.id:
                    property.replaceWith(exports.babelTypes.Identifier(name));
                    break;
                case BabelType.string:
                    property.replaceWith(exports.babelTypes.StringLiteral(name));
                    break;
            }
        }
    };
    /**
     * Identifier hook
     *
     * wx
     *
     * @param path path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }
     * @param appletType AppletType
     */
    BabelPluginBaseApplet.prototype.identifierHook = function (path, appletType) {
        var name = this.getNameValue(path);
        var operationType = undefined;
        var expectAppletType = undefined;
        switch (appletType) {
            case AppletType.wx:
                operationType = AppletType.wx;
                expectAppletType = AppletType.my;
                break;
            case AppletType.my:
                operationType = AppletType.my;
                expectAppletType = AppletType.wx;
                break;
        }
        if (operationType === name &&
            path.scope && path.scope.hasBinding && !path.scope.hasBinding(operationType) &&
            path.isReferencedIdentifier && path.isReferencedIdentifier()) {
            path.replaceWith(exports.babelTypes.Identifier(expectAppletType));
        }
    };
    /**
     * MemberExpression hook
     *
     * wx['request']
     *
     * wx.request
     * wx[functionName]
     *
     * @param path { get: Function }
     * @param appletType AppletType
     */
    BabelPluginBaseApplet.prototype.memberExpressionHook = function (path, appletType) {
        var objectName = this.getObjectNameValue(path);
        var propertyType = this.getPropertyTypeValue(path);
        var map = undefined;
        var operationType = undefined;
        switch (appletType) {
            case AppletType.wx:
                map = wechat_to_alipay_map_1.wechatToAlipayMap;
                operationType = AppletType.wx;
                break;
            case AppletType.my:
                map = alipay_to_wechat_map_1.alipayToWechatMap;
                operationType = AppletType.my;
                break;
        }
        if (map && operationType && operationType !== '') {
            if (operationType === objectName) {
                switch (propertyType) {
                    // wx.request
                    // wx[functionName]
                    case 'Identifier': {
                        var propertyName = this.getPropertyNameValue(path);
                        var expectPropertyName = map[propertyName];
                        if (expectPropertyName) {
                            this.replaceProperty(path, BabelType.id, expectPropertyName);
                        }
                        break;
                    }
                    // wx['request']
                    case 'StringLiteral': {
                        var propertyValue = this.getPropertyValueValue(path);
                        var expectPropertyName = map[propertyValue];
                        if (expectPropertyName) {
                            this.replaceProperty(path, BabelType.string, expectPropertyName);
                        }
                        break;
                    }
                }
            }
        }
    };
    return BabelPluginBaseApplet;
}());
exports.BabelPluginBaseApplet = BabelPluginBaseApplet;
//# sourceMappingURL=babel-plugin-base-applet.js.map