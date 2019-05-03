/**
 * Created by：CaMnter
 */

import { AppletType, BabelPluginBaseApplet } from "./base/babel-plugin-base-applet";

export class BabelPluginWechatToAlipay extends BabelPluginBaseApplet {

  createPlugin(): Function {
    const _memberExpressionHook = this.memberExpressionHook.bind(this);
    return function (): object {
      return {
        name: 'babel plugin wechat to alpay',
        visitor: {
          /**
           *
           * wx['request']
           *
           * wx.request
           * wx[functionName]
           *
           *
           * @param path path
           * @constructor
           */
          MemberExpression(path: { get: Function }) {
            _memberExpressionHook(path, AppletType.wx);
          },
        }
      };
    };
  }

}