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

import { IPlugin } from "./i-plugin";
import BasePlugin from "./base-plugin";
import { AppletType } from "../type/applet-type";
import { jsTransForm } from "../js/js-transform";
import BabelPluginWechatToAlipay from "../babel-plugin/babel-plugin-wechat-to-alipay";
import BabelPluginAlipayToWechat from "../babel-plugin/babel-plugin-alipay-to-wechat";

/**
 * @author CaMnter
 */

class JsPlugin extends BasePlugin {

  private readonly _babelPlugin: Function;

  constructor(target: AppletType,
              expect: AppletType) {
    super(target, expect);
    this._babelPlugin = this.getBabelPlugin(this._target, this._expect);
    if (!this._babelPlugin) {
      throw new Error(`JsPlugin # constructor #「babelPlugin」error: ${ this._babelPlugin }`);
    }
  }

  run(code: string | undefined | null): string {
    if (!code || '' === code) {
      throw new Error(`JsPlugin # run #「code」error: ${ code }`);
    }

    this._result = jsTransForm(code, this._babelPlugin);
    return this._result;
  }

  getBabelPlugin(target: AppletType, expect: AppletType): Function {
    switch (target) {
      case AppletType.wx:
        switch (expect) {
          case AppletType.my:
            return new BabelPluginWechatToAlipay().createPlugin();
            break;
          // TODO more
        }
        break;
      case AppletType.my:
        switch (expect) {
          case AppletType.wx:
            return new BabelPluginAlipayToWechat().createPlugin();
            break;
          // TODO more
        }
        break;
    }
    throw new Error(`JsPlugin # getBabelPlugin #「babelPlugin」undefined error`);
  }

  get babelPlugin(): Function {
    return this._babelPlugin;
  }

  get result(): string | undefined {
    return this._result;
  }

}

export default JsPlugin;