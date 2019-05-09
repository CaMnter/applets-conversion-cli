/*
 * Copyright (C) 2019 CaMnter yuanyu.camnter@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Created by：CaMnter
 */

import { AppletType } from "./base/enum/applet-type";
import { BabelPluginBaseApplet } from "./base/babel-plugin-base-applet";

export class BabelPluginWechatToAlipay extends BabelPluginBaseApplet {

  public createPlugin(): Function {
    const _identifierHook = this.identifierHook.bind(this);
    const _callExpressionHook = this.callExpressionHook.bind(this);
    const _memberExpressionHook = this.memberExpressionHook.bind(this);
    return function (): object {
      return {
        name: 'babel babel-plugin wechat to alpay',
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