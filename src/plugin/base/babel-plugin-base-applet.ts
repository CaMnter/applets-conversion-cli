/**
 * Created by：CaMnter
 */

import { BabelType } from "./enum/babel-type";
import { AppletType } from "./enum/applet-type";
import { wechatToAlipayMap } from "../map/wechat-to-alipay-map";
import { alipayToWechatMap } from "../map/alipay-to-wechat-map";
import { BabelPluginIApplet } from "./babel-plugin-i-applet";
import { BabelPluginIIdentifierHook } from "./hook/babel-plugin-i-identifier-hook";
import { BabelPluginICallExpressionHook } from "./hook/babel-plugin-i-call-expression-hook";
import { BabelPluginIMemberExpressionHook } from "./hook/babel-plugin-i-member-expression-hook";

export const babelTypes = require('@babel/types');

export abstract class BabelPluginBaseApplet implements BabelPluginIApplet,
  BabelPluginIIdentifierHook,
  BabelPluginICallExpressionHook,
  BabelPluginIMemberExpressionHook {

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
  public getAstValue(path: { get?: Function }, key?: string): string {
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
   * Handle applet type
   *
   * @param appletType AppletType
   */
  public handleAppletType(appletType: AppletType): {
    map: object | any | undefined,
    operationType: string | undefined,
    expectAppletType: string | undefined
  } {
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
    return {
      map,
      operationType,
      expectAppletType
    };
  }


  /**
   * Identifier hook
   *
   * wx
   *
   * @param path path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }
   * @param appletType AppletType
   */
  public identifierHook(path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }, appletType: AppletType): void {
    const name: string = this.getAstValue(path, 'name');

    const typeProcessingResult = this.handleAppletType(appletType);
    const { operationType, expectAppletType } = typeProcessingResult;

    if (typeProcessingResult.operationType === name &&
      path.scope && path.scope.hasBinding && !path.scope.hasBinding(operationType) &&
      path.isReferencedIdentifier && path.isReferencedIdentifier()) {
      path.replaceWith(babelTypes.Identifier(expectAppletType));
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
  public callExpressionHook(path: { get: Function }, appletType: AppletType): void {
    const calleeAst: { isMemberExpression?: Function, get?: Function } = this.getAst(path, 'callee');
    if (calleeAst && calleeAst.isMemberExpression && calleeAst.isMemberExpression()) {

      const typeProcessingResult = this.handleAppletType(appletType);
      const { map, operationType, expectAppletType } = typeProcessingResult;

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
          if (expectAppletType && operationType === calleeObjectName) {
            const calleeObjectAst: { get?: Function, replaceWith?: Function, isMemberExpression?: Function } = this.getAst(path, 'callee.object');
            this.replaceAst(calleeObjectAst, BabelType.id, expectAppletType);
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
  public memberExpressionHook(path: { get: Function }, appletType: AppletType): void {
    const objectName: string = this.getAstValue(path, 'object.name');
    const propertyType: string = this.getAstValue(path, 'property.type');

    const typeProcessingResult = this.handleAppletType(appletType);
    const { map, operationType } = typeProcessingResult;

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