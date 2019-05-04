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
   * ast
   *
   * @param path { get?: Function }
   * @param key string
   */
  public getAst(path: { get?: Function }, key?: string): { get?: Function, replaceWith?: Function, isMemberExpression?: Function } {
    if (key && path.get && 'function' === typeof path.get) {
      return path.get(key);
    } else {
      return {};
    }
  }

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
   * replace ast
   *
   * @param ast  { replaceWith?: Function }
   * @param type BabelType
   * @param name string
   */
  public replaceAst(ast: { get?: Function, replaceWith?: Function, isMemberExpression?: Function }, type: BabelType, name: string): void {
    if (ast && ast.replaceWith && 'function' === typeof ast.replaceWith) {
      switch (type) {
        case BabelType.id:
          ast.replaceWith(babelTypes.Identifier(name));
          break;
        case BabelType.string:
          ast.replaceWith(babelTypes.StringLiteral(name));
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
    const name: string = this.getAstValue(path, 'name');

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
   * CallExpression hook
   *
   * wx.request({ url: 'https://www.camnter.com' })
   * wx['request']({ url: 'https://www.camnter.com' })
   * wx[functionName]({ url: 'https://www.camnter.com' })
   *
   * @param path { get: Function }
   * @param appletType AppletType
   */
  public callExpressionHook(path: { get: Function }, appletType: AppletType) {
    const calleeAst: { isMemberExpression?: Function, get?: Function } = this.getAst(path, 'callee');
    if (calleeAst && calleeAst.isMemberExpression && calleeAst.isMemberExpression()) {

      // TODO refactor
      let map: object | any | undefined = undefined;
      let operationType: string | undefined = undefined;
      let expectAppletType: string | undefined = undefined;
      switch (appletType) {
        case AppletType.wx:
          map = wechatToAlipayMap;
          operationType = AppletType.wx;
          expectAppletType = AppletType.my;
          break;
        case AppletType.my:
          map = alipayToWechatMap;
          operationType = AppletType.my;
          expectAppletType = AppletType.wx;
          break;
      }
      if (calleeAst.get && 'function' === typeof calleeAst.get && operationType === calleeAst.get('object.name').node) {
        if (calleeAst.get('computed').node) {
          // dynamic
          const calleePropertyType = this.getAstValue(path, 'callee.property.type');
          if ('StringLiteral' === calleePropertyType) {
            const calleePropertyValue = this.getAstValue(path, 'callee.property.value');
            const expectCalleePropertyValue = map[calleePropertyValue];
            if (expectCalleePropertyValue) {
              const propertyAst = this.getAst(path, 'property');
              this.replaceAst(propertyAst, BabelType.string, expectCalleePropertyValue);
            }
          }
        } else {
          // static
          // wx
          const calleeObjectName = this.getAstValue(path, 'callee.object.name');
          // request
          const calleePropertyName = this.getAstValue(path, 'callee.property.name');
          const expectCalleePropertyValue = map[calleePropertyName];
          // request => httpRequest
          if (expectCalleePropertyValue) {
            const calleePropertyAst: { get?: Function, replaceWith?: Function, isMemberExpression?: Function } = this.getAst(path, 'callee.property');
            this.replaceAst(calleePropertyAst, BabelType.id, expectCalleePropertyValue);
          }
          // wx => my
          if (operationType === calleeObjectName) {
            const calleeObjectAst: { get?: Function, replaceWith?: Function, isMemberExpression?: Function } = this.getAst(path, 'callee.object');
            this.replaceAst(calleeObjectAst, BabelType.id, expectCalleePropertyValue);
          }
        }
      }
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
    const objectName: string = this.getAstValue(path, 'object.name');
    const propertyType: string = this.getAstValue(path, 'property.type');

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
            const propertyName: string = this.getAstValue(path, 'property.name');
            const expectPropertyName = map[propertyName];
            if (expectPropertyName) {
              const propertyAst = this.getAst(path, 'property');
              this.replaceAst(propertyAst, BabelType.id, expectPropertyName);
            }
            break;
          }
          // wx['request']
          case 'StringLiteral': {
            const propertyValue: string = this.getAstValue(path, 'property.value');
            const expectPropertyName = map[propertyValue];
            if (expectPropertyName) {
              const propertyAst = this.getAst(path, 'property');
              this.replaceAst(propertyAst, BabelType.string, expectPropertyName);
            }
            break;
          }
        }
      }
    }
  }

}