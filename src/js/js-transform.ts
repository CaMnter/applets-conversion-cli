/**
 * Created by：CaMnter
 */

import { BabelPluginIApplet } from "../plugin/base/babel-plugin-i-applet";

const babel = require('@babel/core');

export function jsTransForm(code: string | undefined, plugin: BabelPluginIApplet) {
  // IApplet
  const opts: { plugins?: Array<any> } = {};
  if (plugin) {
    opts.plugins = [plugin];
    code = babel.transform(code, opts).code;
  }
  return code && 'string' == typeof code ? code.trim() : '';
}