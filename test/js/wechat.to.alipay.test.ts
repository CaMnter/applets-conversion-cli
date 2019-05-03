/**
 * Created by：CaMnter
 */

const assert = require('assert');
const { jsTransForm } = require('../../lib/js/js-transform');
const { getBabelPluginWechatToAlipay } = require('../../lib/plugin/provider');
const { getBabelPluginAlipayToWechat } = require('../../lib/plugin/provider');

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

  // alipay to wechat

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
