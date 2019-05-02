/**
 * Created by：CaMnter
 */

import { BabelPluginIApplet } from "./babel-plugin-i-applet";

declare const require: any;
export const types = require('@babel/types');

export abstract class BabelPluginBaseApplet implements BabelPluginIApplet {

  public types: any = types as any;

  abstract createPlugin(): Function;

}
