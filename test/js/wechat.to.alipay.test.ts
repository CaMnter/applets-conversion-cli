/**
 * Created by：CaMnter
 */

// @ts-ignore
const { _require } = require;

const assert = _require('assert');
const { jsTransForm } = _require('../../lib/js/js-transform');
const { getBabelPluginWechatToAlipay } = _require('../../lib/plugin/provider');

describe('「wechat to alipay」', function () {

  it('wx.request => my.httpRequest', () => {
    const code = 'wx.request;';
    const expect = 'my.httpRequest;';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx.navigateTo => my.navigateTo', () => {
    const code = 'wx.navigateTo;';
    const expect = 'my.navigateTo;';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx.request() => my.httpRequest()', () => {
    const code = 'wx.request();';
    const expect = 'my.httpRequest();';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx.navigateTo() => my.navigateTo()', () => {
    const code = 'wx.navigateTo();';
    const expect = 'my.navigateTo();';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx[\"request\"]() => my[\"httpRequest\"]()', () => {
    const code = 'wx[\"request\"]();';
    const expect = 'my[\"httpRequest\"]();';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

  it('wx[\"navigateTo\"]() => my[\"navigateTo\"]()', () => {
    const code = 'wx[\"navigateTo\"]();';
    const expect = 'my[\"navigateTo\"]();';
    assert.equal(jsTransForm(code, getBabelPluginWechatToAlipay()), expect);
  });

});
