/**
 * Created by：CaMnter
 */

import { AppletType } from "../enum/applet-type";

export interface BabelPluginIIdentifierHook {

  /**
   * Identifier hook
   *
   * wx
   *
   * @param path path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }
   * @param appletType AppletType
   */
  identifierHook(path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }, appletType: AppletType): void;

}
