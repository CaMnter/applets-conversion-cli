/**
 * Created by：CaMnter
 */

import { AppletType } from "../enum/applet-type";

export interface BabelPluginICallExpressionHook {

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
  callExpressionHook(path: { get: Function }, appletType: AppletType): void;

}
