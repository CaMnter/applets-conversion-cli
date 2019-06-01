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
  'wx:if': 'a:if',
  'wx:elif': 'a:elif',
  'wx:else': 'a:else',
  'wx:for': 'a:for',
  // 没有 a:for-items
  'wx:for-index': 'a:for-index',
  'wx:for-item': 'a:for-item',
  'wx:key': 'a:key',

  'bindtap': 'onTap',
  'catchtap': 'catchTap',
  'bindlongtap': 'onLongTap',

  'bindblur': 'onBlur',
  'bindreset': 'onReset',
  'bindinput': 'onInput',

  'bindfocus': 'onFocus',
  'bindchange': 'onChange',
  'bindsubmit': 'onSubmit',
  'bindconfirm': 'onConfirm',
  'bindchanging': 'onChanging',

  'bindtouchstart': 'onTouchStart',
  'bindtouchmove': 'onTouchMove',
  'bindtouchend': 'onTouchEnd',
  'bindtouchcancel': 'onTouchCancel',
};

const scrollView: { [attr: string]: string } = {
  'bindscroll': 'onScroll',
  'bindscrolltolower': 'onScrollToLower',
  'bindscrolltoupper': 'onScrollToUpper',
};

const progress: { [attr: string]: string } = {
  'activeColor': 'active-color',
  'backgroundColor': 'background-color'
};

const slider: { [attr: string]: string } = {
  'activeColor': 'active-color',
};

const image: { [attr: string]: string } = {
  'bindload': 'onLoad',
  'binderror': 'onError'
};

const canvas: { [attr: string]: string } = {
  'canvas-id': 'id',
};

const map: { [attr: string]: string } = {
  'polygons': 'polygon',
  'bindmarkertap': 'onMarkerTap',
  'bindcallouttap': 'onCalloutTap',
  'bindcontroltap': 'onControlTap',
  'bindregionchange': 'onRegionChange',
};

const views: { [attr: string]: { [attr: string]: string } } = {
  'scroll-view': scrollView,
  progress,
  slider,
  image,
  canvas,
  map,
};


export const wechatToAlipayXmlMap: { $base: { [attr: string]: string }, [attr: string]: { [attr: string]: string } } = {
  $base,
  ...views
};