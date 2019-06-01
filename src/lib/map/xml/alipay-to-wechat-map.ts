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
 * @author CaMnter
 */

const $base: { [attr: string]: string } = {
  'a:if': 'wx:if',
  'a:elif': 'wx:elif',
  'a:else': 'wx:else',
  'a:for': 'wx:for',
  // 没有 a:for-items
  'a:for-index': 'wx:for-index',
  'a:for-item': 'wx:for-item',
  'a:key': 'wx:key',

  'onTap': 'bindtap',
  'catchTap': 'catchtap',
  'onLongTap': 'bindlongtap',

  'onBlur': 'bindblur',
  'onReset': 'bindreset',
  'onInput': 'bindinput',
  'onFocus': 'bindfocus',
  'onChange': 'bindchange',
  'onSubmit': 'bindsubmit',
  'onConfirm': 'bindconfirm',
  'onChanging': 'bindchanging',

  'onTouchStart': 'bindtouchstart',
  'onTouchMove': 'bindtouchmove',
  'onTouchEnd': 'bindtouchend',
  'onTouchCancel': 'bindtouchcancel',
};

const scrollView: { [attr: string]: string } = {
  'onScroll': 'bindscroll',
  'onScrollToLower': 'bindscrolltolower',
  'onScrollToUpper': 'bindscrolltoupper',
};

const progress: { [attr: string]: string } = {
  'active-color': 'activeColor',
  'background-color': 'backgroundColor'
};

const slider: { [attr: string]: string } = {
  'active-color': 'activeColor',
};

const image: { [attr: string]: string } = {
  'onLoad': 'bindload',
  'onError': 'binderror',
};

const canvas: { [attr: string]: string } = {
  'id': 'canvas-id',
};

const map: { [attr: string]: string } = {
  'polygon': 'polygons',
  'onMarkerTap': 'bindmarkertap',
  'onCalloutTap': 'bindcallouttap',
  'onControlTap': 'bindcontroltap',
  'onRegionChange': 'bindregionchange',
};

const views: { [attr: string]: { [attr: string]: string } } = {
  'scroll-view': scrollView,
  progress,
  slider,
  image,
  canvas,
  map,
};


export const alipayToWechatXmlMap: { $base: { [attr: string]: string }, [attr: string]: { [attr: string]: string } } = {
  $base,
  ...views
};