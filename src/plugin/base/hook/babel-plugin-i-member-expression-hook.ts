/**
 * Created by：CaMnter
 */

import { AppletType } from "../enum/applet-type";

export interface BabelPluginIMemberExpressionHook {

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
  memberExpressionHook(path: { get: Function }, appletType: AppletType): void;

}
