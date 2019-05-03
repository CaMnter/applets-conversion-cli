/**
 * Created by：CaMnter
 */

import { BabelPluginIApplet } from "./babel-plugin-i-applet";
import { wechatToAlipayMap } from "../map/wechat-to-alipay-map";
import { alipayToWechatMap } from "../map/alipay-to-wechat-map";

export const babelTypes = require('@babel/types');

export enum AppletType {
  wx = 'wx',
  my = 'my'
};

export enum BabelType {
  id = 'id',
  string = 'string'
};

export abstract class BabelPluginBaseApplet implements BabelPluginIApplet {

  abstract createPlugin(): Function;

  /**
   * ast「value」
   *
   * @param path { get?: Function }
   * @param key string
   */
  public getAstValue(path: { get?: Function }, key?: string) {
    if (key && path.get && 'function' === typeof path.get) {
      return path.get(key).node;
    } else {
      return '';
    }
  }

  /**
   * object.name「value」
   *
   * @param path { get?: Function }
   */
  public getObjectNameValue(path: { get?: Function }): string {
    return this.getAstValue(path, 'object.name');
  }

  /**
   * property.type「value」
   *
   * @param path { get?: Function }
   */
  public getPropertyTypeValue(path: { get?: Function }): string {
    return this.getAstValue(path, 'property.type');
  }

  /**
   * property.name「value」
   *
   * @param path { get?: Function }
   */
  public getPropertyNameValue(path: { get?: Function }): string {
    return this.getAstValue(path, 'property.name');
  }

  /**
   * property.value「value」
   *
   * @param path { get?: Function }
   */
  public getPropertyValueValue(path: { get?: Function }): string {
    return this.getAstValue(path, 'property.value');
  }

  /**
   * name「value」
   *
   * @param path { get?: Function }
   */
  public getNameValue(path: { get?: Function }): string {
    return this.getAstValue(path, 'name');
  }

  /**
   * property
   *
   * @param path { get?: Function }
   */
  public getProperty(path: { get?: Function }): { replaceWith?: Function } | undefined {
    if (path.get && 'function' === typeof path.get) {
      return path.get('property');
    } else {
      return undefined;
    }
  }

  /**
   * replace property
   *
   * @param path { get?: Function }
   * @param type BabelType
   * @param name string
   */
  public replaceProperty(path: { get?: Function }, type: BabelType, name: string): void {
    const property: { replaceWith?: Function } | undefined = this.getProperty(path);
    if (property && property.replaceWith && 'function' === typeof property.replaceWith) {
      switch (type) {
        case BabelType.id:
          property.replaceWith(babelTypes.Identifier(name));
          break;
        case BabelType.string:
          property.replaceWith(babelTypes.StringLiteral(name));
          break;
      }
    }
  }

  /**
   * Identifier hook
   *
   * wx
   *
   * @param path path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }
   * @param appletType AppletType
   */
  identifierHook(path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }, appletType: AppletType) {
    const name: string = this.getNameValue(path);

    let operationType: string | undefined = undefined;
    let expectAppletType: string | undefined = undefined;
    switch (appletType) {
      case AppletType.wx:
        operationType = AppletType.wx;
        expectAppletType = AppletType.my;
        break;
      case AppletType.my:
        operationType = AppletType.my;
        expectAppletType = AppletType.wx;
        break;
    }

    if (operationType === name &&
      path.scope && path.scope.hasBinding && !path.scope.hasBinding(operationType) &&
      path.isReferencedIdentifier && path.isReferencedIdentifier()) {
      path.replaceWith(babelTypes.Identifier(expectAppletType))
    }
  }

  /**
   * MemberExpression hook
   *
   * wx['request']
   *
   * wx.request
   * wx[functionName]
   *
   * @param path { get: Function }
   * @param appletType AppletType
   */
  public memberExpressionHook(path: { get: Function }, appletType: AppletType) {
    const objectName: string = this.getObjectNameValue(path);
    const propertyType: string = this.getPropertyTypeValue(path);

    let map: object | any | undefined = undefined;
    let operationType: string | undefined = undefined;
    switch (appletType) {
      case AppletType.wx:
        map = wechatToAlipayMap;
        operationType = AppletType.wx;
        break;
      case AppletType.my:
        map = alipayToWechatMap;
        operationType = AppletType.my;
        break;
    }

    if (map && operationType && operationType !== '') {
      if (operationType === objectName) {
        switch (propertyType) {
          // wx.request
          // wx[functionName]
          case 'Identifier': {
            const propertyName: string = this.getPropertyNameValue(path);
            const expectPropertyName = map[propertyName];
            if (expectPropertyName) {
              this.replaceProperty(path, BabelType.id, expectPropertyName);
            }
            break;
          }
          // wx['request']
          case 'StringLiteral': {
            const propertyValue: string = this.getPropertyValueValue(path);
            const expectPropertyName = map[propertyValue];
            if (expectPropertyName) {
              this.replaceProperty(path, BabelType.string, expectPropertyName);
            }
            break;
          }
        }
      }
    }
  }

}