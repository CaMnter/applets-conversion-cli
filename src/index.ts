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

import * as path from 'path';
import JsPlugin from "./lib/plugin/js-plugin";
import XmlPlugin from "./lib/plugin/xml-plugin";
import CssPlugin from "./lib/plugin/css-plugin";
import { AppletType } from "./lib/type/applet-type";
import { overrideSync } from "./lib/utils/file-system/file-system";
import { info, error, warnAny, red, orange, yellow, magenta, green } from "./lib/utils/log";

/**
 * @author CaMnter
 */

export interface AppletsConversionToolParams {
  // target directory
  src?: string,
  // output directory
  out?: string,
  // target applet type
  target?: string,
  // expect applet type
  expect?: string,
  // extend options
  options?: {
    // whether to convert to es5 completely
    es5?: boolean,
    // folders that need to be filtered. eg: '.idea', 'node_modules'
    filter?: Array<string>
    [option: string]: any
  }
}

export interface Plugins {
  // js plugin
  jsPlugin?: JsPlugin,
  // css plugin
  cssPlugin?: CssPlugin,
  // xml plugin
  xmlPlugin?: XmlPlugin,
}

export enum Plan {
  wxToMy = 'wxToMy',
  myToWx = 'myToWx',
}

export enum ExtName {
  js = 'js',
  // TODO extend feature
  ts = 'ts',
  axml = 'axml',
  wxml = 'wxml',
  acss = 'acss',
  wxss = 'wxss',
}

export const appletTypeList: Array<string> = [AppletType.wx, AppletType.my];
export const appletTypeListPrintText = appletTypeList.join(', ');
export const defaultFilter: Array<string> = ['node_modules', '.tea', '.idea'];

/**
 * applets conversion tool
 *
 * @param params AppletsConversionToolParams
 */
export function appletsConversionTool(params: AppletsConversionToolParams): void {
  info(magenta, '转换开始');
  let { src, out, target, expect, options } = params;
  const currentAbsolutePath: string = path.resolve(process.cwd());

  if (!target || !checkAppletsType('target', target)) {
    error(red, `缺少必填参数 -t or --target「目标类型 ${ appletTypeListPrintText }」`);
    return;
  }
  if (!expect || !checkAppletsType('expect', expect)) {
    error(red, `缺少必填参数 -e or --expect「期望类型 ${ appletTypeListPrintText }」`);
    return;
  }
  if (target === expect) {
    error(red, `--t or --target 不能和 -e or --expect 一致，target = ${ target }  target = ${ expect }`);
    return;
  }
  const plan: Plan | undefined = getPlan(target, expect);
  if (!plan) {
    error(red, `--t or --target 或 -e or --expect 校验失败，target = ${ target }  target = ${ expect }`);
    return;
  }

  let useSrcDefaultPath: boolean = false;
  let useOutDefaultPath: boolean = false;
  if (!src || '' === src) {
    src = currentAbsolutePath;
    useSrcDefaultPath = true;
  } else {
    src = path.resolve(currentAbsolutePath, src);
    useSrcDefaultPath = false;
  }

  if (useSrcDefaultPath) {
    info(yellow, `缺少 src 参数，默认为当前命令行目录 src = ${ src }`);
  } else {
    info(yellow, `src = ${ src }`);
  }

  if (!out || '' === out) {
    out = src;
    useOutDefaultPath = true;
  } else {
    out = path.resolve(currentAbsolutePath, out);
    useOutDefaultPath = false;
  }

  if (useOutDefaultPath) {
    info(yellow, `缺少 out 参数，默认为当前命令行目录 out = ${ out }`);
  } else {
    info(yellow, `out = ${ out }`);
  }

  let es5: boolean | undefined;
  let filter: Array<string> | undefined = defaultFilter;
  if (options) {
    es5 = options.es5;
    const optionsFilter: Array<string> | undefined = options.filter;
    if (optionsFilter && Array.isArray(optionsFilter) && optionsFilter.length > 0) {
      filter = [...filter, ...optionsFilter];
    }
  }

  const printParams = {
    src,
    out,
    target,
    expect,
    ...options
  };
  Object.keys(printParams).forEach((key: string) => {
    const value: string | object | Array<any> = (printParams as any)[key];
    if (Array.isArray(value)) {
      info(orange, `${ key } -> ${ JSON.stringify(value) }`)
    } else {
      info(orange, `${ key } -> ${ value }`);
    }
  });

  const plugins: Plugins = getPlugins(plan);

  overrideSync(src, out, {
    es5,
    filter,
    override: function (content: string, absolutePath: string, relativePath: string) {
      const extName: string = path.extname(absolutePath);
      const basename: string = path.basename(absolutePath);
      const filePath: string = path.join(out as string, basename);
      let expectContent: string = content;
      try {
        expectContent = contentHook(extName, content, plan, plugins);
        info(green, `${ absolutePath } -> ${ filePath }`);
      } catch (e) {
        warnAny(e);
      }
      return {
        content: expectContent,
        filePath
      }
    }
  });

  info(magenta, '转换结束');
}

/**
 * check applets type
 *
 * @param paramsName paramsName
 * @param target target
 */
export function checkAppletsType(paramsName: string, target?: string): boolean {
  if (!target || '' === target) {
    return false;
  }
  const some: boolean = appletTypeList.some((value: string) => {
    return value === target;
  });

  if (!some) {
    error(red, `${ paramsName } 参数错误，应为「${ appletTypeListPrintText }」`);
  }
  return some;
}

/**
 * get plan
 *
 * @param target target
 * @param expect expect
 */
export function getPlan(target: string, expect: string): Plan | undefined {
  switch (target) {
    case AppletType.wx:
      switch (expect) {
        case AppletType.my:
          return Plan.wxToMy;
        // TODO more
      }
      break;
    case AppletType.my:
      switch (expect) {
        case AppletType.wx:
          return Plan.myToWx;
        // TODO more
      }
      break;
  }
  return;
}

/**
 * get plugins
 *
 * @param plan plan
 */
export function getPlugins(plan: Plan): Plugins {
  let jsPlugin: JsPlugin | undefined;
  let cssPlugin: CssPlugin | undefined;
  let xmlPlugin: XmlPlugin | undefined;
  switch (plan) {
    case Plan.wxToMy:
      jsPlugin = new JsPlugin(AppletType.wx, AppletType.my);
      cssPlugin = new CssPlugin(AppletType.wx, AppletType.my);
      xmlPlugin = new XmlPlugin(AppletType.wx, AppletType.my);
      break;
    case Plan.myToWx:
      jsPlugin = new JsPlugin(AppletType.my, AppletType.wx);
      cssPlugin = new CssPlugin(AppletType.my, AppletType.wx);
      xmlPlugin = new XmlPlugin(AppletType.my, AppletType.wx);
      break;
    // TODO more
  }
  return {
    jsPlugin,
    cssPlugin,
    xmlPlugin,
  };
}

/**
 * content hook
 *
 * @param extName extName
 * @param content content
 * @param plan plan
 * @param plugins plugins
 */
export function contentHook(extName: string,
                            content: string,
                            plan: Plan,
                            plugins: Plugins): string {
  const { jsPlugin, cssPlugin, xmlPlugin } = plugins;
  let expectContent = content;
  switch (plan) {
    case Plan.wxToMy:
      /**
       *「js」
       *「wxss」
       *「wxml」
       */
      switch (extName) {
        case ExtName.js:
          if (jsPlugin) {
            expectContent = jsPlugin.run(content);
          }
          break;
        case ExtName.wxss:
          if (cssPlugin) {
            expectContent = cssPlugin.run(content);
          }
          break;
        case ExtName.wxml:
          if (xmlPlugin) {
            expectContent = xmlPlugin.run(content);
          }
          break;
      }
      break;
    case Plan.myToWx:
      /**
       *「js」
       *「acss」
       *「axml」
       */
      switch (extName) {
        case ExtName.js:
          if (jsPlugin) {
            expectContent = jsPlugin.run(content);
          }
          break;
        case ExtName.acss:
          if (cssPlugin) {
            expectContent = cssPlugin.run(content);
          }
          break;
        case ExtName.axml:
          if (xmlPlugin) {
            expectContent = xmlPlugin.run(content);
          }
          break;
      }
      break;
  }
  return expectContent;
}
