/**
 * Created by：CaMnter
 */

import { AppletType, BabelPluginBaseApplet } from "./base/babel-plugin-base-applet";

export class BabelPluginWechatToAlipay extends BabelPluginBaseApplet {

  public createPlugin(): Function {
    const _identifierHook = this.identifierHook.bind(this);
    const _callExpressionHook = this.callExpressionHook.bind(this);
    const _memberExpressionHook = this.memberExpressionHook.bind(this);
    return function (): object {
      return {
        name: 'babel plugin wechat to alpay',
        visitor: {

          /**
           * wx
           *
           * @param path { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }
           * @constructor constructor
           */
          Identifier(path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }) {
            _identifierHook(path, AppletType.wx)
          },

          /**
           * wx.request({ url: 'https://www.camnter.com' })
           * wx['request']({ url: 'https://www.camnter.com' })
           * wx[functionName]({ url: 'https://www.camnter.com' })
           *
           * @param path { get: Function }
           * @constructor constructor
           */
          CallExpression(path: { get: Function }) {
            _callExpressionHook(path, AppletType.wx);
          },

          /**
           * wx['request']
           *
           * wx.request
           * wx[functionName]
           *
           * @param path { get: Function }
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