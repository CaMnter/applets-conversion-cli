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

/**
 * Created by：CaMnter
 */

import { expect } from 'chai';
import { parse, stringify, Stylesheet } from 'css';

describe('「css」', function () {

  it('css parse', () => {
    const code = '@import \'./sign/save.wxss\';\n' +
      '@import \'./sign/you.wxss\';\n' +
      '@import \'./sign/from.wxss\';\n' +
      '@import \'./sign/anything.wxss\';\n' +
      '\n' +
      '.save {\n' +
      '\twidth: 2333rpx;\n' +
      '\tbackground: #faebd7\n' +
      '}\n' +
      '\n' +
      '.you {\n' +
      '\tdisplay: flex;\n' +
      '\theight: 2233rpx;\n' +
      '\tflex-direction: column;\n' +
      '\tjustify-content: center;\n' +
      '\talign-items: center\n' +
      '}\n' +
      '\n' +
      '.from {\n' +
      '\twidth: 2233rpx;\n' +
      '\twidth: 233rpx;\n' +
      '\theight: 233rpx;\n' +
      '\tbackground: bisque;\n' +
      '\tbackground: #deb887\n' +
      '}\n' +
      '\n' +
      '.anything {\n' +
      '\tdisplay: flex;\n' +
      '\tflex-direction: column;\n' +
      '\tjustify-content: center;\n' +
      '\talign-items: center\n' +
      '}\n' +
      '\n' +
      '.anything {\n' +
      '\twidth: 23rpx;\n' +
      '\theight: 23rpx;\n' +
      '\tbackground: #ff69b4\n' +
      '}';
    const { stylesheet } = parse(code, {});
    if (stylesheet) {
      const firstType = stylesheet.rules[0].type;
      expect(firstType).to.equal('import');
    }
  });

  it('css stringify', () => {
    const code = '@import \'./sign/save.wxss\';\n' +
      '@import \'./sign/you.wxss\';\n' +
      '@import \'./sign/from.wxss\';\n' +
      '@import \'./sign/anything.wxss\';\n' +
      '\n' +
      '.save {\n' +
      '\twidth: 2333rpx;\n' +
      '\tbackground: #faebd7\n' +
      '}\n' +
      '\n' +
      '.you {\n' +
      '\tdisplay: flex;\n' +
      '\theight: 2233rpx;\n' +
      '\tflex-direction: column;\n' +
      '\tjustify-content: center;\n' +
      '\talign-items: center\n' +
      '}\n' +
      '\n' +
      '.from {\n' +
      '\twidth: 2233rpx;\n' +
      '\twidth: 233rpx;\n' +
      '\theight: 233rpx;\n' +
      '\tbackground: bisque;\n' +
      '\tbackground: #deb887\n' +
      '}\n' +
      '\n' +
      '.anything {\n' +
      '\tdisplay: flex;\n' +
      '\tflex-direction: column;\n' +
      '\tjustify-content: center;\n' +
      '\talign-items: center\n' +
      '}\n' +
      '\n' +
      '.anything {\n' +
      '\twidth: 23rpx;\n' +
      '\theight: 23rpx;\n' +
      '\tbackground: #ff69b4\n' +
      '}';
    const stylesheet: Stylesheet = parse(code, {});
    stringify(stylesheet, { indent: '  ' });
  });

});
