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
import { CssType } from "../css/type/css-type";
import { AppletType } from "../type/applet-type";
import { cssTransform } from "../css/css-transform";

/**
 * @author CaMnter
 */

class CssPlugin implements IPlugin {

  private readonly _code: string | undefined | null;
  private readonly _target: AppletType;
  private readonly _expect: AppletType;

  private _targetCss?: CssType;
  private _expectCss?: CssType;

  private _result?: string;

  constructor(code: string | undefined | null, target: AppletType, expect: AppletType) {
    if (!code || '' === code) {
      throw new Error(`CssPlugin # constructor #「code」error: ${ code }`);
    }

    if (!target) {
      throw new Error(`CssPlugin # constructor #「target」error: ${ target }`);
    }

    if (!expect) {
      throw new Error(`CssPlugin # constructor #「expect」error: ${ expect }`);
    }

    this._code = code;
    this._target = target;
    this._expect = expect;
  }

  run(): void {
    this.checkAppletType('_target', '_targetCss', this._target,);
    this.checkAppletType('_expect', '_expectCss', this._expect,);

    if (!this._targetCss || !this._expectCss) {
      throw new Error(`CssPlugin # run # missing CssType「this.targetCss」: ${ this._targetCss }「this.expectCss」: ${ this._expectCss }`);
    }

    this._result = cssTransform(this._code, this._targetCss, this._expectCss);
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

  get code(): string | undefined | null {
    return this._code;
  }

  get target(): AppletType {
    return this._target;
  }

  get expect(): AppletType {
    return this._expect;
  }

  get targetCss(): CssType | undefined {
    return this._targetCss;
  }

  get expectCss(): CssType | undefined {
    return this._expectCss;
  }

  get result(): string | undefined {
    return this._result;
  }

}

export default CssPlugin;