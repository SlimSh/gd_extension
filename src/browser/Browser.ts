import SearchUtils from "../utils/SearchUtils";
import Utils from "../Utils";

export interface IMessageSender {
    id: string;
    url: string;
    nativeApp: string;
    tlsChannelId: string;
}

export type TCallMessageCallback = (
    message: any,
    messageSender: IMessageSender,
    responce: () => void
) => void;

class Browser {
    public id: string = chrome.runtime.id;
    public getBrowserName: string = 'Chrome';
    public appVersion: string = chrome.runtime.getManifest().version;

    public addMessageListener = (callback: TCallMessageCallback) => {
        // https://developer.chrome.com/apps/runtime#event-onMessage
        chrome.runtime.onMessage.addListener(
            (message, messageSender: IMessageSender, sendResponce) => {
            callback(message, messageSender, sendResponce);
            return true;
        });
    }

    public addExternalMessageListener = (callback: TCallMessageCallback) => {
        //https://developer.chrome.com/apps/runtime#event-onMessageExternal
        chrome.runtime.onMessageExternal.addListener(
            (message, messageSender: IMessageSender, response) => {
                callback(message, messageSender, response)
            }
        )
    }

    public handleBeforeRequest = (urls: string | string[], callback: (details: chrome.webRequest.WebRequestBodyDetails) => void) => {
        // https://developer.chrome.com/extensions/webRequest#subscription
        chrome.webRequest.onBeforeRequest.addListener(callback, {
            urls: Array.isArray(urls) ? urls : [urls],
            types: ['main_frame']
        }, ['blocking']);
    }

    public handleNavigationCommitted = (urls: any, callback: (details: chrome.webNavigation.WebNavigationTransitionCallbackDetails) => void) => {
        // тут есть не соответствие спеке
        // прослушивальщик событий вторым параметром принимает другой конфиг
        // https://developer.chrome.com/extensions/webNavigation#event-onCommitted
        chrome.webNavigation.onCommitted.addListener(callback, {
            url: Array.isArray(urls) ? urls : [urls]
        });
    }

    public handleRequestComplete = (urls: any, callback: (detail: chrome.webRequest.WebResponseCacheDetails) => void) => {
        chrome.webRequest.onCompleted.addListener(callback, {
            urls: Array.isArray(urls) ? urls : [urls],
            types: ["main_frame"]
        })
    }

    public addOmniBoxInputListener = (callback: (text: string) => void) => {
        chrome.omnibox.onInputEntered.addListener((e) => {
            callback(e)
        });
    }

    public handleIconClick = (callback: any) => {
        chrome.browserAction.onClicked.addListener((e) => {
            callback(e);
        })
    }

    public addEtensionInstalledListener = (callback: any) => {
        chrome.management.onInstalled.addListener((e) => {
            callback(e);
        })
    }

    public addExtensionEnabledListener = (callback: any) => {
        chrome.management.onEnabled.addListener((e) => {
            callback(e);
        })
    }

    public addExtensionDisabledListener = (callback: any) => {
        chrome.management.onDisabled.addListener((e) => {
            callback(e);
        })
    }

    public addExtensionUninstalledListener = (callback: any) => {
        chrome.management.onUninstalled.addListener((e) => {
            callback(e);
        })
    }

    public uninstallExtension = (extension: any, callback: any) => {
        chrome.management.uninstall(extension, function() {
            return callback()
        })
    }

    public getExtensionUrl = (path: string) => {
        // https://developers.chrome.com/extensions/extension#method-getURL
        return chrome.extension.getURL(path);
    }

    public setUninstallPage = (url: string) => {
        chrome.runtime.setUninstallURL && chrome.runtime.setUninstallURL(url);
    }

    public getInstalledExtensions = (callback: any) => {
        //https://developers.chrome.com/extensions/management#method-getAll
        chrome.management.getAll && chrome.management.getAll(callback);
    }

    public restart = () => {
        chrome.runtime.reload && chrome.runtime.reload();
    }

    public searchFromRequest =
        (mess: chrome.webRequest.WebRequestBodyDetails, searUrl: string, callback: any) => {
        try {
            // третий параметр неиспользуется по приложению
            let urlQuery = SearchUtils.getQuery(mess.url);
            if (urlQuery) {
                const redirectUrl = `${searUrl}&searchtype=ds&q=${urlQuery}`;
                callback && callback('', 'handleSearch', Utils.getHostname(mess.url), redirectUrl);
                return {
                    redirectUrl
                }
            }
        } catch (e) {}
    }
}

const browser = new Browser;
export default browser;