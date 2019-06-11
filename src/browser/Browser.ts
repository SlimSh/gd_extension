import { response } from "express";

interface IMessageSender {
    id: string;
    url: string;
    nativeApp: string;
    tlsChannelId: string;
}

type TCallMessageCallback = (
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

    public handleBeforeRequest = (urls: string | string[], event: any) => {
        // https://developer.chrome.com/extensions/webRequest#subscription
        chrome.webRequest.onBeforeRequest.addListener(event, {
            urls: Array.isArray(urls) ? urls : [urls],
            types: ['main_frame']
        }, ['blocking'])
    }

    public handleNavigationCommitted = (urls: string | string[], event: any) => {
        chrome.webNavigation.onCommitted.addListener(event, {
            urls: Array.isArray(urls) ? urls : [urls]
        })
    }
}