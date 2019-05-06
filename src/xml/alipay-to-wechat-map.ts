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

export const alipayToWechatXmlMap: { [attr: string]: string } = {
  'a:if': 'wx:if',
  'a:elif': 'wx:elif',
  'a:else': 'wx:else',
  'a:for': 'wx:for',
  // 没有 a:for-items
  'a:for-index': 'wx:for-index',
  'a:for-item': 'wx:for-item',
  'a:key': 'a:key',
  'onTap': 'onTap',
  'catchTap': 'catchTap',
  'onInput': 'bindinput',
  'onChange': 'bindchange',
  'onFocus': 'bindfocus',
  'onSubmit': 'bindsubmit',

  // TODO
};