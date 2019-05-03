/**
 * Created by：CaMnter
 */

const assert = require('assert');
const { jsTransForm } = require('../../lib/js/js-transform');
const { getBabelPluginWechatToAlipay } = require('../../lib/plugin/provider');

describe('「Member expression hook」', function () {
  it('wx.request => my.httpRequest', () => {
    const code = 'wx.request';
    let expect = 'my.httpRequest;';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  })
})