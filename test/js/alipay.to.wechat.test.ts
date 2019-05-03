/**
 * Created by：CaMnter
 */

// @ts-ignore
const { _require } = require;

const assert = _require('assert');
const { jsTransForm } = _require('../../lib/js/js-transform');
const { getBabelPluginAlipayToWechat } = _require('../../lib/plugin/provider');

describe('「alipay to wechat」', function () {

  it('my.httpRequest => wx.request', () => {
    const code = 'my.httpRequest;';
    const expect = 'wx.request;';
    assert.equal(jsTransForm(code, getBabelPluginAlipayToWechat()), expect);
  });

  it('my.navigateTo => wx.navigateTo', () => {
    const code = 'my.navigateTo;';
    const expect = 'wx.navigateTo;';
    assert.equal(jsTransForm(code, getBabelPluginAlipayToWechat()), expect);
  });

  it('my.httpRequest() => wx.request()', () => {
    const code = 'my.httpRequest();';
    const expect = 'wx.request();';
    assert.equal(jsTransForm(code, getBabelPluginAlipayToWechat()), expect);
  });

  it('my.navigateTo() => wx.navigateTo()', () => {
    const code = 'my.navigateTo();';
    const expect = 'wx.navigateTo();';
    assert.equal(jsTransForm(code, getBabelPluginAlipayToWechat()), expect);
  });

  it('my[\"httpRequest\"]() => wx[\"request\"]()', () => {
    const code = 'my[\"httpRequest\"]();';
    const expect = 'wx[\"request\"]();';
    assert.equal(jsTransForm(code, getBabelPluginAlipayToWechat()), expect);
  });

  it('my[\"navigateTo\"]() => wx[\"navigateTo\"]()', () => {
    const code = 'my[\"navigateTo\"]();';
    const expect = 'wx[\"navigateTo\"]();';
    assert.equal(jsTransForm(code, getBabelPluginAlipayToWechat()), expect);
  });
})