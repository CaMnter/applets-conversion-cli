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

/**
 * @author CaMnter
 */

interface AppletsConversionToolParams {
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

interface Plugins {
  // js plugin
  jsPlugin?: JsPlugin,
  // css plugin
  cssPlugin?: CssPlugin,
  // xml plugin
  xmlPlugin?: XmlPlugin,
}

enum Plan {
  wxToMy,
  myToWx
}

enum ExtName {
  js = 'js',
  // TODO extend feature
  ts = 'ts',
  axml = 'axml',
  wxml = 'wxml',
  acss = 'acss',
  wxss = 'wxss',
}

const appletTypeList: Array<string> = [AppletType.wx, AppletType.my];

/**
 * applets conversion tool
 *
 * @param params AppletsConversionToolParams
 */
function appletsConversionTool(params: AppletsConversionToolParams): void {
  let { src, out, target, expect, options } = params;
  const currentAbsolutePath: string = path.resolve(process.cwd());

  if (!target || !checkAppletsType('target', target)) {
    return;
  }
  if (!expect || !checkAppletsType('expect', expect)) {
    return;
  }
  if (target === expect) {
    // TODO console.log error
    return;
  }
  const plan: Plan | undefined = getPlan(target, expect);
  if (!plan) {
    // TODO console.log error
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

  if (!out || '' === out) {
    out = src;
    useOutDefaultPath = true;
  } else {
    out = path.resolve(currentAbsolutePath, out);
    useOutDefaultPath = false;
  }

  const plugins: Plugins = getPlugins(plan);

  // TODO console.log info「src」「out」「useSrcDefaultPath」「useOutDefaultPath」

  overrideSync(src, out, {
    override: function (content: string, absolutePath: string, relativePath: string) {
      const extName: string = path.extname(absolutePath);
      const basename: string = path.basename(absolutePath);
      let expectContent: string = contentHook(extName, content, plan, plugins);
      return {
        content: expectContent,
        filePath: path.join(out as string, basename)
      }
    }
  });

}

/**
 * check applets type
 *
 * @param paramsName paramsName
 * @param target target
 */
function checkAppletsType(paramsName: string, target?: string): boolean {
  if (!target || '' === target) {
    return false;
  }
  const some: boolean = appletTypeList.some((value: string) => {
    return value === target;
  });

  // TODO console.log error

  return some;
}

/**
 * get plan
 *
 * @param target target
 * @param expect expect
 */
function getPlan(target: string, expect: string): Plan | undefined {
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
function getPlugins(plan: Plan): Plugins {
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
function contentHook(extName: string,
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
