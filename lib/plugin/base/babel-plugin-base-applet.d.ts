/**
 * Created by：CaMnter
 */
import { BabelPluginIApplet } from "./babel-plugin-i-applet";
export declare const babelTypes: any;
export declare enum AppletType {
    wx = "wx",
    my = "my"
}
export declare enum BabelType {
    id = "id",
    string = "string"
}
export declare abstract class BabelPluginBaseApplet implements BabelPluginIApplet {
    abstract createPlugin(): Function;
    /**
     * ast「value」
     *
     * @param path { get?: Function }
     * @param key string
     */
    getAstValue(path: {
        get?: Function;
    }, key?: string): any;
    /**
     * object.name「value」
     *
     * @param path { get?: Function }
     */
    getObjectNameValue(path: {
        get?: Function;
    }): string;
    /**
     * property.type「value」
     *
     * @param path { get?: Function }
     */
    getPropertyTypeValue(path: {
        get?: Function;
    }): string;
    /**
     * property.name「value」
     *
     * @param path { get?: Function }
     */
    getPropertyNameValue(path: {
        get?: Function;
    }): string;
    /**
     * property.value「value」
     *
     * @param path { get?: Function }
     */
    getPropertyValueValue(path: {
        get?: Function;
    }): string;
    /**
     * name「value」
     *
     * @param path { get?: Function }
     */
    getNameValue(path: {
        get?: Function;
    }): string;
    /**
     * property
     *
     * @param path { get?: Function }
     */
    getProperty(path: {
        get?: Function;
    }): {
        replaceWith?: Function;
    } | undefined;
    /**
     * replace property
     *
     * @param path { get?: Function }
     * @param type BabelType
     * @param name string
     */
    replaceProperty(path: {
        get?: Function;
    }, type: BabelType, name: string): void;
    /**
     * Identifier hook
     *
     * wx
     *
     * @param path path: { get: Function, scope: { hasBinding: Function }, isReferencedIdentifier: Function, replaceWith: Function }
     * @param appletType AppletType
     */
    identifierHook(path: {
        get: Function;
        scope: {
            hasBinding: Function;
        };
        isReferencedIdentifier: Function;
        replaceWith: Function;
    }, appletType: AppletType): void;
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
    memberExpressionHook(path: {
        get: Function;
    }, appletType: AppletType): void;
}
