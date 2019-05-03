/**
 * Created by：CaMnter
 */

import { AppletType, BabelPluginBaseApplet } from "./base/babel-plugin-base-applet";

export class BabelPluginWechatToAlipay extends BabelPluginBaseApplet {

  public createPlugin(): Function {
    const _identifierHook = this.identifierHook.bind(this);
    const _memberExpressionHook = this.memberExpressionHook.bind(this);
    return function (): object {
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
          Identifier(path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }) {
            _identifierHook(path, AppletType.wx)
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
          MemberExpression(path: { get: Function }) {
            _memberExpressionHook(path, AppletType.wx);
          },
        }
      };
    };
  }

}