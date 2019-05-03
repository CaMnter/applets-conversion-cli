"use strict";
/**
 * Created by：CaMnter
 */
Object.defineProperty(exports, "__esModule", { value: true });
var babel = require('@babel/core');
function jsTransForm(code, babelPlugin) {
    // IApplet
    var opts = {};
    if (babelPlugin) {
        opts.plugins = [babelPlugin];
        code = babel.transform(code, opts).code;
    }
    return code && 'string' == typeof code ? code.trim() : '';
}
exports.jsTransForm = jsTransForm;
//# sourceMappingURL=js-transform.js.map