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

export const wechatToAlipayXmlMap: { [attr: string]: string } = {
  'wx:if': 'a:if',
  'wx:elif': 'a:elif',
  'wx:else': 'a:else',
  'wx:for': 'a:for',
  'wx:for-items': 'a:for',
  'wx:for-index': 'a:for-index',
  'wx:for-item': 'a:for-item',
  'wx:key': 'a:key',
  'bindtap': 'onTap',
  'catchtap': 'catchTap',
  'bindinput': 'onInput',
  'bindchange': 'onChange',
  'bindfocus': 'onFocus',
  'bindsubmit': 'onSubmit',

  // TODO
};