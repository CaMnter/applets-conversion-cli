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
import { AppletType } from "../type/applet-type";

/**
 * @author CaMnter
 */

abstract class BasePlugin implements IPlugin {

  protected readonly _target: AppletType;
  protected readonly _expect: AppletType;

  protected _result: string | undefined;
  private _plugins: Array<IPlugin> = [];

  protected constructor(target: AppletType, expect: AppletType) {
    if (!target) {
      throw new Error(`BasePlugin # constructor #「target」error: ${ target }`);
    }

    if (!expect) {
      throw new Error(`BasePlugin # constructor #「expect」error: ${ expect }`);
    }

    this._target = target;
    this._expect = expect;
  }

  abstract run(code: string | undefined | null): string ;

  public get plugins(): Array<IPlugin> {
    return this._plugins;
  }

  public set plugins(value: Array<IPlugin>) {
    this._plugins = value;
  }

  get target(): AppletType {
    return this._target;
  }

  get expect(): AppletType {
    return this._expect;
  }

  get result(): string | undefined {
    return this._result;
  }

}

export default BasePlugin;