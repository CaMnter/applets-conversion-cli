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
import { CssType } from "../type/css-type";
import { AppletType } from "../type/applet-type";
import { cssTransform } from "../css/css-transform";

/**
 * @author CaMnter
 */

class CssPlugin extends BasePlugin {

  private _targetCss?: CssType;
  private _expectCss?: CssType;

  constructor(target: AppletType,
              expect: AppletType) {
    super(target, expect);
  }

  run(code: string | undefined | null): string {
    if (!code || '' === code) {
      throw new Error(`CssPlugin # constructor #「code」error: ${ code }`);
    }
    this.checkAppletType('_target', '_targetCss', this._target);
    this.checkAppletType('_expect', '_expectCss', this._expect);

    if (!this._targetCss || !this._expectCss) {
      throw new Error(`CssPlugin # run # missing CssType「this.targetCss」: ${ this._targetCss }「this.expectCss」: ${ this._expectCss }`);
    }

    this._result = cssTransform(code, this._targetCss, this._expectCss);
    return this._result;
  }

  checkAppletType(name: string, targetCssName: string, target: AppletType,): void {
    const _this = this as any;
    switch (target) {
      case AppletType.wx:
        _this[`${ targetCssName }`] = CssType.wxss;
        break;
      case AppletType.my:
        _this[`${ targetCssName }`] = CssType.acss;
        break;
      default:
        throw new Error(`CssPlugin # checkAppletType # atypical applet type「${ name }」: ${ this._target }`);
        break;
    }
  }

  get targetCss(): CssType | undefined {
    return this._targetCss;
  }

  get expectCss(): CssType | undefined {
    return this._expectCss;
  }

}

export default CssPlugin;