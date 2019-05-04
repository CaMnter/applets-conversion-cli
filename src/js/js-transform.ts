/**
 * Created by：CaMnter
 */

const babel = require('@babel/core');

export function jsTransForm(code: string | undefined, babelPlugin: Function) {
  // IApplet
  const opts: { plugins?: Array<any> } = {};
  if (babelPlugin) {
    opts.plugins = [babelPlugin];
    code = babel.transform(code, opts).code;
  }
  return code && 'string' == typeof code ? code.trim() : '';
}